const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Limit file size to 10MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image'); // 'image' is the field name in the form data

// Check File Type
function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
router.post('/', auth, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'Error: No File Selected!' });
            } else {
                res.status(200).json({
                    message: 'File uploaded successfully!',
                    // IMPORTANT: This path must match how you serve static files
                    filePath: `/uploads/${req.file.filename}`
                });
            }
        }
    });
});

module.exports = router; 