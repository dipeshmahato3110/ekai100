const express = require('express');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'testimonial-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Public: Submit a testimonial with photo and rating
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log('Testimonial submission received:', req.body);
    const { name, message, rating } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    
    console.log('Creating testimonial with data:', { name, message, photo, rating });
    
    const testimonial = new Testimonial({ 
      name, 
      message, 
      photo,
      rating: parseInt(rating) || 5
    });
    
    const savedTestimonial = await testimonial.save();
    console.log('Testimonial saved successfully:', savedTestimonial);
    
    res.status(201).json({ message: 'Testimonial submitted! Pending approval.' });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    res.status(500).json({ message: 'Failed to submit testimonial.' });
  }
});

// Public: Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    console.log('Fetching approved testimonials...');
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    console.log('Found testimonials:', testimonials.length);
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials.' });
  }
});

// Admin: Get all testimonials (approved and pending)
router.get('/all', auth, async (req, res) => {
  try {
    console.log('Fetching all testimonials for admin...');
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    console.log('Found testimonials:', testimonials.length);
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials.' });
  }
});

// Admin: Approve or edit a testimonial
router.patch('/:id', auth, async (req, res) => {
  try {
    const { approved, name, message, rating } = req.body;
    const update = {};
    if (approved !== undefined) update.approved = approved;
    if (name) update.name = name;
    if (message) update.message = message;
    if (rating) update.rating = parseInt(rating);
    
    console.log('Updating testimonial:', req.params.id, update);
    
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Failed to update testimonial.' });
  }
});

// Admin: Delete a testimonial
router.delete('/:id', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted.' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Failed to delete testimonial.' });
  }
});

module.exports = router; 