# Ride-Hailing Application

A comprehensive ride-hailing application with React Native mobile client, Node.js backend, and AI-powered assistant features.

## Features

### Passenger Features
- **User Registration & Login**: Secure authentication for passengers and drivers
- **Home Dashboard**: Clean interface with navigation to all features
- **Ride Booking**: Request rides with pickup/destination coordinates and ride type selection
- **Real-time Ride Tracking**: Monitor ride status with live updates via Socket.IO
- **Ride History**: View past rides with detailed information
- **AI Ride Assistant**: Chat with an AI assistant for ride-related questions and support

### Driver Features
- **Driver Dashboard**: Dedicated interface for drivers
- **Available Rides**: View and accept incoming ride requests
- **Ride Management**: Update ride status (accepted, in progress, completed)
- **Real-time Notifications**: Receive new ride requests instantly

### Backend Features
- **RESTful API**: Comprehensive endpoints for all operations
- **Real-time Communication**: Socket.IO for live updates
- **Database Integration**: PostgreSQL with Sequelize ORM
- **AI Integration**: OpenRouter API with GPT-4o for intelligent assistance
- **Authentication**: JWT-based secure authentication

## Technology Stack

### Frontend (React Native)
- React Navigation for screen management
- Modern UI with clean, minimalist design
- Real-time updates with Socket.IO client
- Service layer architecture for API calls

### Backend (Node.js)
- Express.js framework
- Socket.IO for real-time communication
- Sequelize ORM with PostgreSQL
- JWT authentication
- OpenRouter AI integration

### Database
- PostgreSQL with comprehensive schema
- User management (passengers/drivers)
- Ride tracking and history
- Ratings and favorites support

## Project Structure

```
├── client/                     # React Native mobile app
│   ├── screens/               # All screen components
│   │   ├── LoginScreen.js
│   │   ├── RegistrationScreen.js
│   │   ├── HomeScreen.js
│   │   ├── RideRequestScreen.js
│   │   ├── RideTrackingScreen.js
│   │   ├── RideHistoryScreen.js
│   │   ├── DriverDashboardScreen.js
│   │   └── RideAssistantScreen.js
│   ├── services/              # API service layers
│   │   ├── AuthService.js
│   │   ├── RideService.js
│   │   ├── DriverService.js
│   │   └── LLMService.js
│   ├── App.js                 # Main navigation setup
│   └── package.json
├── server/                    # Node.js backend
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── rideController.js
│   │   ├── driverController.js
│   │   └── llmController.js
│   ├── routes/                # API endpoints
│   │   ├── authRoutes.js
│   │   ├── rideRoutes.js
│   │   ├── driverRoutes.js
│   │   └── llmRoutes.js
│   ├── models/                # Database models
│   │   ├── index.js
│   │   ├── user.js
│   │   └── ride.js
│   ├── lib/
│   │   └── sequelize.js       # Database connection
│   ├── server.js              # Main server file
│   ├── .env.example           # Environment variables template
│   └── package.json
├── database/
│   └── schema.sql             # Database schema
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- React Native development environment
- OpenRouter API key (for AI features)

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE ride_hailing_db;
```

2. Run the schema file:
```bash
psql -d ride_hailing_db -f database/schema.sql
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
DB_NAME=ride_hailing_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
JWT_SECRET=your_secure_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=3001
```

5. Start the server:
```bash
npm start
```

### Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (if using macOS):
```bash
cd ios && pod install && cd ..
```

4. Start the React Native app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Rides (Passenger)
- `POST /api/rides/request` - Request a new ride
- `GET /api/rides/status/:rideId` - Get ride status
- `GET /api/rides/history/:userId` - Get ride history
- `PUT /api/rides/update/:rideId` - Update ride status

### Driver Operations
- `GET /api/driver/rides/:driverId` - Get driver's rides
- `GET /api/driver/available-rides` - Get available rides
- `POST /api/driver/ride/accept` - Accept a ride
- `POST /api/driver/ride/update` - Update ride status

### AI Assistant
- `POST /api/llm/chat` - Send message to AI assistant

## AI Integration

The application includes an AI-powered ride assistant using OpenRouter's API with GPT-4o model. Features include:

- **Customizable System Prompt**: Users can modify the AI's behavior
- **Contextual Responses**: AI understands ride-hailing context
- **Error Handling**: Graceful fallbacks for API issues
- **Real-time Chat**: Instant responses with typing indicators

### Getting OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Create an account
3. Generate an API key
4. Add it to your `.env` file

## Socket.IO Events

### Client Events
- `joinRoom` - Join a specific room (drivers/passengers)
- `leaveRoom` - Leave a room
- `rideRequest` - Emit new ride request
- `rideStatusUpdate` - Emit ride status changes

### Server Events
- `newRideRequest` - New ride available for drivers
- `rideStatusUpdate` - Ride status changed

## Design Principles

### UI/UX Guidelines
- **Clean & Modern**: Minimalist design with ample whitespace
- **Consistent Typography**: Inter font family throughout
- **Color Scheme**: Primary blue (#007bff) with neutral grays
- **No External Icons**: Typography and layout-based design
- **Responsive**: Works across all device sizes
- **Accessible**: Clear contrast and readable text

### Code Architecture
- **Service Layer**: Separated API calls from UI components
- **Error Handling**: Comprehensive error management
- **Real-time Updates**: Socket.IO for live data
- **Modular Design**: Reusable components and services

## Testing

### Backend Testing
Use tools like Postman to test API endpoints:

```bash
# Test user registration
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "passenger"
}
```

### Frontend Testing
- Navigate through all screens
- Test ride booking flow
- Verify real-time updates
- Test AI chat functionality

## Deployment

### Backend Deployment
1. Set up PostgreSQL database on your hosting platform
2. Configure environment variables
3. Deploy to platforms like Heroku, AWS, or DigitalOcean

### Mobile App Deployment
1. Build for production:
```bash
# iOS
npm run build:ios

# Android
npm run build:android
```

2. Follow platform-specific deployment guides for App Store/Play Store

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation
- Review the code comments
- Test with the provided examples
- Ensure all environment variables are properly configured

## Future Enhancements

- **Maps Integration**: Google Maps for visual ride tracking
- **Payment Processing**: Stripe/PayPal integration
- **Push Notifications**: Firebase for mobile notifications
- **Advanced Analytics**: Ride metrics and reporting
- **Multi-language Support**: Internationalization
- **Driver Verification**: Document upload and approval system
