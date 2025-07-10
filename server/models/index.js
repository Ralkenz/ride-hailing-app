const User = require('./user');
const Ride = require('./ride');
const Vehicle = require('./vehicle');

// Define associations
User.hasMany(Ride, { 
  foreignKey: 'passengerId', 
  as: 'passengerRides' 
});

User.hasMany(Ride, { 
  foreignKey: 'driverId', 
  as: 'driverRides' 
});

Ride.belongsTo(User, { 
  foreignKey: 'passengerId', 
  as: 'passenger' 
});

Ride.belongsTo(User, { 
  foreignKey: 'driverId', 
  as: 'driver' 
});

// Vehicle associations
User.hasOne(Vehicle, { 
  foreignKey: 'driver_id', 
  as: 'vehicle' 
});

Vehicle.belongsTo(User, { 
  foreignKey: 'driver_id', 
  as: 'driver' 
});

module.exports = {
  User,
  Ride,
  Vehicle
};
