const { createUser } = require("../dtos/user");
const { store } = require("../repositories/user-repository");
const { hashPassword } = require("../utils/argon");
const { generateToken } = require("../utils/jwt");
const responseFormatter = require("../utils/responser");
const signupValidator = require("../validators/signup-validators");

const signupService = async (req, res ) => {
    const { error } = signupValidator.validate(req.body);
    if (error) {
        return responseFormatter(res, "Validation Error", error.details.map(err => err.message), 404);
    }
    const passwordHashed = await hashPassword(req.body.password);
    const user = await store(createUser(req.body,passwordHashed));
    return responseFormatter(res,true,generateToken(user),"User is signed up successfully",200);
    
}

module.exports = {signupService}