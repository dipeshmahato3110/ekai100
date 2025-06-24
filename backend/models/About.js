const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
});

const About = mongoose.model('About', aboutSchema);

module.exports = About; 