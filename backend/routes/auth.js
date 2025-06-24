const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route to create a first admin user (should be used only once)
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

// Route for admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: user, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});


module.exports = router; 