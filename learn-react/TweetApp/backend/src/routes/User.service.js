// User.service.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User.model');

const registerUser = async (userData) => {
    try {
        const { username, password, name, email, mobileNumber } = userData;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username is already taken.');
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

        return { message: 'User registered successfully', token };
    } catch (error) {
        throw new Error('An error occurred while registering the user.');
    }
};

const loginUser = async (username, password) => {
    try {
        // Check if the username exists
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid username or password');
        }

        // If the username and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id, userName: user.name }, 'your-secret-key', { expiresIn: '1h' });

        return token;
    } catch (error) {
        throw new Error('An error occurred during login');
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find({}, "-password"); // Exclude the password field
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

const updateUserRole = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.role = "admin"; // Set the user's role as admin
        await user.save();

        return user;
    } catch (error) {
        throw new Error('Error updating user role');
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId, '-password'); // Exclude the password field

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error('An error occurred while fetching the user');
    }
};

const updateUserById = async (userId, userData) => {
    try {
        const { username, name, email, mobileNumber } = userData;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Update user fields
        user.username = username || user.username;
        user.name = name || user.name;
        user.email = email || user.email;
        user.mobileNumber = mobileNumber || user.mobileNumber;

        await user.save();

        return user;
    } catch (error) {
        throw new Error('An error occurred while updating the user');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    updateUserRole,
    getUserById,
    updateUserById
};
