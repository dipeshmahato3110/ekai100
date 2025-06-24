const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const auth = require('../middleware/auth');
const router = express.Router();

// POST a new contact message (public)
router.post('/', async (req, res) => {
    const message = new ContactMessage(req.body);
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all contact messages (protected)
router.get('/', auth, async (req, res) => {
    try {
        const messages = await ContactMessage.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a contact message (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        await ContactMessage.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Contact Message' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 