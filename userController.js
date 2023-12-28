const User = require('./user')
const getUser=async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const createUser = async (req, res) => {
    const { username, email } = req.body;
  
    try {
      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports={getUser,createUser}