// models/servicePriceOptions.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const ServicePriceOptions = sequelize.define("servicePriceOptions", {
  duration: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  type: {
    type: DataTypes.STRING,
    validate: {
      isIn: [["Hourly", "Weekly", "Monthly"]],
    },
  },
});

module.exports = ServicePriceOptions;
