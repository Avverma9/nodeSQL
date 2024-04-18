const express = require("express");
const router = express.Router();
const Category = require("./categoryController");

router.post("/register", Category.createUser);


module.exports = router;
