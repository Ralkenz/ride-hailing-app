const axios = require('axios');

exports.handleChat = async (req, res) => {
  try {
    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'OpenRouter API key not configured' });
    }

    const defaultSystemPrompt = systemPrompt || 
      "You are a helpful ride-hailing assistant. Help users with questions about rides, booking, safety, and general guidance. Be concise and friendly.";

    const requestBody = {
      model: "openai/gpt-4o",
      messages: [
        {
          role: "system",
          content: defaultSystemPrompt
        },
        {
          role: "user",
          content: [
            { type: "text", text: message }
          ]
        }
      ]
    };

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001',
          'X-Title': 'Ride Hailing App'
        },
        timeout: 30000
      }
    );

    const aiResponse = response.data.choices[0]?.message?.content;
    
    if (!aiResponse) {
      return res.status(500).json({ message: 'No response from AI service' });
    }

    return res.json({ 
      response: aiResponse,
      model: "openai/gpt-4o"
    });

  } catch (error) {
    console.error('LLM Chat error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ message: 'Invalid API key' });
    } else if (error.response?.status === 429) {
      return res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
    } else if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ message: 'Request timeout. Please try again.' });
    }
    
    return res.status(500).json({ message: 'AI service temporarily unavailable' });
  }
};
