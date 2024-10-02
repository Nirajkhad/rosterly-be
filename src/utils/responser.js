// utils/responseFormatter.js

const responseFormatter = (res, success, data = null, message = '', statusCode = 200, errors = null) => {
    const response = {
        success,
        message,
        data,
        errors
    };
    return res.status(statusCode).json(response);
};

module.exports = responseFormatter;
