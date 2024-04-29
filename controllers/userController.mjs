import userModel from '../models/userModel.mjs';

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Assuming your userModel has a method create() to create a new user
    const newUser = await userModel.create({
      username,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export default createUser;
