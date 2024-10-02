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
                null,
                "Unauthorized",
                401,
                ["Token is not provided"]
            );
        }

        // Ensure Bearer token format
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return responseFormatter(
                res,
                false,
                null,
                "Unauthorized",
                401,
                ["Token is not provided"]
            );
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return responseFormatter(
                    res,
                    false,
                    null,
                    "Unauthorized",
                    401,
                    ["Invalid Token"]
                );
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        return responseFormatter(
            res,
            false,
            null,
            "Internal server error !!",
            error?.code ?? 500,
            [error?.message]  ?? ["Something went wrong. Please try again later !!"],
        );
    }
};

module.exports = { verifyUser };
