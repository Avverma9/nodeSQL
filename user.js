// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const User = sequelize.define('User', {
  Username: {
    type: DataTypes.STRING,
   
  },
  email: {
    type: DataTypes.STRING,
    
  },
  password :{
    type : DataTypes.STRING,
    
  }
});

module.exports = User;