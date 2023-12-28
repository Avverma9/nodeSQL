const express = require('express');
const { sequelize } = require('./db');
const User = require('./user');
const route = require('./route');  // Assuming that route.js exports a router instance
const app = express();
app.use(express.json());

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Use the routes as middleware
app.use(route);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
