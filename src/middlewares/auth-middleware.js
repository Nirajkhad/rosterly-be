const jwt = require("jsonwebtoken");
const responseFormatter = require("../utils/responser");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader) {
      return responseFormatter(
        res,
        false,
        "Token is not provided",
        "Unauthorized",
        401
      );
    }

    // Ensure Bearer token format
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return responseFormatter(
        res,
        false,
        "Invalid Token",
        "Unauthorized",
        401
      );
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return responseFormatter(
          res,
          false,
          "Invalid Token",
          "Unauthorized",
          401
        );
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return responseFormatter(
      res,
      false,
      error?.message ?? "Something went wrong. Please try again later !!",
      "Internal server error !!",
      error?.code ?? 500
    );
  }
};

module.exports = {verifyUser};
