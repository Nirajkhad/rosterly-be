const jwt = require('jsonwebtoken');
const { createToken } = require('../dtos/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Replace with your secret key

const generateToken = (user) => {
    let response = createToken(user);
    response.access_token  = jwt.sign(createToken(user), JWT_SECRET);
    return response;
}

module.exports = {generateToken}