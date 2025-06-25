const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  photo: { type: String }, // URL to uploaded photo
  rating: { type: Number, min: 1, max: 5, default: 5 }, // Star rating 1-5, default to 5
  approved: { type: Boolean, default: false }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial; 