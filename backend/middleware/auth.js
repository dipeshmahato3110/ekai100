const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const isCustomAuth = token.length < 500; // Differentiate between our own token and Google's

        let decodedData;

        if (token && isCustomAuth) {
            const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
            decodedData = jwt.verify(token, JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            // Logic for Google OAuth if you add it later
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log('Auth error:', error);
        res.status(401).json({ message: "Authentication failed." });
    }
};

module.exports = auth; 