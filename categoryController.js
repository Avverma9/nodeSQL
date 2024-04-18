const bcrypt = require("bcrypt");

const userModel = require("./user");

//JWT PART

const createUser = async (req, res) => {
  const { Username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      Username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//============================



module.exports = {
  createUser,

 

};
