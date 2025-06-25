const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Multer setup for profile photo upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads/admin');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

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

// Route to get current admin profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile.' });
    }
});

// Route to update admin email or password
router.put('/me', auth, async (req, res) => {
    try {
        const { email, password } = req.body;
        const update = {};
        if (email) update.email = email;
        if (password) update.password = await bcrypt.hash(password, 12);
        const user = await User.findByIdAndUpdate(req.userId, update, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile.' });
    }
});

// Route to upload/change profile photo
router.post('/me/photo', auth, upload.single('profilePhoto'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
        const photoUrl = `/uploads/admin/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(req.userId, { profilePhoto: photoUrl }, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload photo.' });
    }
});

module.exports = router; 