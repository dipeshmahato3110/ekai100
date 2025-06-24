const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String // You can store an icon class name (e.g., from Font Awesome) or a URL to an icon image
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 