const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');

const Ride = sequelize.define('Ride', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  passengerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  pickupLatitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  pickupLongitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  destinationLatitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  destinationLongitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  rideType: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  fare: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'requested'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Ride;
