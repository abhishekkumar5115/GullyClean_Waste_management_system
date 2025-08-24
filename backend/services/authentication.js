const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const secretKey = process.env.JWT_SECRET;

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
    return token;
}

const validateToken = (token) => {
    try{
        const payload = jwt.verify(token, secretKey);
        return { valid: true, payload };
    }
    catch(err) {
        console.error('Token validation error:', err);
        return { valid: false, error: err.message };
    }
}

module.exports = {
    generateToken, 
    validateToken
};

