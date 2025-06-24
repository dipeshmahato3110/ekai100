const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String
    },
    bio: {
        type: String
    }
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember; 