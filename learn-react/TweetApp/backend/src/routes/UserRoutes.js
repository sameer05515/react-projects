/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Error creating user
 *       500:
 *         description: An error occurred while registering the user
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: An error occurred during login
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Error fetching users
 */

/**
 * @swagger
 * /api/users/{userId}/admin:
 *   put:
 *     summary: Update a user's role as admin
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update
 *     responses:
 *       200:
 *         description: User's role updated to admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user role
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while fetching the user
 *   put:
 *     summary: Update a user by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while updating the user
 */


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.post('/register', async (req, res) => {
  try {
    const { username, password, name, email, mobileNumber } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      name, // New field
      email, // New field
      mobileNumber, // New field
    });

    await newUser.save();

    // Create and send a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering the user.' });
  }
});

// POST /api/users/login - User login endpoint
router.post('/login', async (req, res) => {
    try {
      // Check if the username exists
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // If the username and password are correct, generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      // Send the token in the response
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  });

  // Define a route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Define a route to update a user's role as an admin
router.put("/:userId/admin", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = "admin"; // Set the user's role as admin
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Error updating user role" });
  }
});

// Define a route to get a user by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId, '-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by userId:', error);
    res.status(500).json({ message: 'An error occurred while fetching the user' });
  }
});

// Define a route to update a user by userId
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, name, email, mobileNumber } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.username = username || user.username;
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user by userId:', error);
    res.status(500).json({ message: 'An error occurred while updating the user' });
  }
});

module.exports = router;
