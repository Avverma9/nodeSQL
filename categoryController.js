const userModel = require("./user");
const multer = require("multer");

// Define storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle form data
const createUser = async (req, res) => {
  try {
    // Extract fields from form data
    const { Username, email, password } = req.body;

    // Create new user in the database
    const newUser = await userModel.create({
      Username,
      email,
      password
    });

    // Return the new user in the response
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
};
