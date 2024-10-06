const responseFormatter = require("../utils/responser");

const notFoundMiddleware = (req, res, next) => {
  responseFormatter(
    res,
    false,
    null,
    "Route not found",
    404,
    ["The requested route does not exist"]
  );
};

module.exports = notFoundMiddleware;
