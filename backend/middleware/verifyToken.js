const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    } 

    try {         
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } 
    catch (err) {
        console.error('JWT verification failed:', err);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = verifyToken;
