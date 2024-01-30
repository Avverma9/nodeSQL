const express = require("express");
const { sequelize } = require("./db");

const route = require("./route"); 
const app = express();
app.use(express.json());

const dotenv = require("dotenv");

dotenv.config();

sequelize
  .sync()
  .then(() => {
    console.log("Database and tables synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.use(route);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
