const express = require("express");
const { sequelize } = require("./db");
const route = require("./route");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequelize
  .sync()
  .then(() => {
    console.log("Database and tables synced");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
const upload = multer();
app.use("/", upload.none(), route);

module.exports = app;
