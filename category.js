// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const User = sequelize.define('Category', {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
