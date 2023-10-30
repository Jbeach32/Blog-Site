const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

const UserController = {
  // User registration
  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await User.create({
        username,
        password: hashedPassword,
      });

      // Return a success response or redirect to the login page
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle registration error
      res.status(500).json({ message: 'Registration failed' });
    }
  },

  // User login
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the entered password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Set up the user session
      req.session.user = user;

      // Return a success response or redirect to the user's dashboard
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      // Handle login error
      res.status(500).json({ message: 'Login failed' });
    }
  },
};

module.exports = UserController;
