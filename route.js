const express = require("express");
const router = express.Router();
const User = require("./userController");


router.post("/user", User.createUser);
router.get("/get-user", User.getUser);


module.exports = router;
