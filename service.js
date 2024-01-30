
const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const ServicePriceOptions = require('./servicePrice'); 

const NewService = sequelize.define('newService', {
  categoryId: {
    type: DataTypes.STRING,
  },
  serviceName: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
});


NewService.hasMany(ServicePriceOptions, { foreignKey: 'serviceId' });

module.exports = NewService;
