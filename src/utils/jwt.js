const jwt = require('jsonwebtoken');
const { createToken } = require('../dtos/user');


const generateToken = (user, remember_me = false) => {
    let response = createToken(user);
    response.access_token  = jwt.sign(createToken(user, remember_me), process.env.JWT_SECRET);
    return response;
}

module.exports = {generateToken}