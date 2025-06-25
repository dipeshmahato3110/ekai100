const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// Import Routes
const authRoutes = require('./routes/auth');
const createCrudRoutes = require('./routes/crud');
const uploadRoutes = require('./routes/upload');

// Import Models
const Service = require('./models/Service');
const About = require('./models/About');
const TeamMember = require('./models/TeamMember');
const PortfolioItem = require('./models/PortfolioItem');
const ContactMessage = require('./models/ContactMessage');

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/services', createCrudRoutes(Service));
app.use('/api/about', createCrudRoutes(About));
app.use('/api/team', createCrudRoutes(TeamMember));
app.use('/api/portfolio', createCrudRoutes(PortfolioItem));

// Special route for contact messages (no auth needed for creation)
const contactRoutes = require('./routes/contact');
const testimonialsRoutes = require('./routes/testimonials');
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ekai100';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
