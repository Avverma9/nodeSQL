const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('product', 'root', '9576', {
  host: 'localhost',
  dialect: 'mysql',
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize };
