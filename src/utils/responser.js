// utils/responseFormatter.js

const responseFormatter = (res, success, data = null, message = '', statusCode = 200) => {
    const response = {
        success,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};

module.exports = responseFormatter;
