const { createUser } = require("../dtos/user");
const { store, findOne } = require("../repositories/user-repository");
const { hashPassword, verifyPassword } = require("../utils/argon");
const { generateToken } = require("../utils/jwt");
const responseFormatter = require("../utils/responser");
const signinValidator = require("../validators/signin-validator");
const signupValidator = require("../validators/signup-validators");

const signupService = async (req, res) => {
  const result  =  signupValidator.safeParse(req.body);
  // console.log("ERROR ",error.error);
  
  if (!result.success) {
    return responseFormatter(
      res,
      false,
      result.error.errors.map((err) => err.message).join(", "),
      "Invalid request",
      422
    );
  }
  const existingUser = await findOne({ email: req.body.email });
  if (existingUser) {
    return responseFormatter(
      res,
      false,
      null,
      "This email address is already in use. Please try a different one.",
      422,
    );
  }
  const passwordHashed = await hashPassword(req.body.password);
  const user = await store(createUser(req.body, passwordHashed));
  return responseFormatter(
    res,
    true,
    generateToken(user),
    "Sign up successful! Now, let's get your business details filled in.",
    200
  );
};

const signinService = async (req, res) => {
  const result  =  signinValidator.safeParse(req.body);
  // console.log("ERROR ",error.error);
  
  if (!result.success) {
    return responseFormatter(
      res,
      false,
      result.error.errors.map((err) => err.message).join(", "),
      "Invalid request",
      422
    );
  }
  const user = await findOne({ email: req.body.email });
  if (!user) {
    return responseFormatter(
      res,
      false,
      null,
      "Invalid username or password",
      401,
    );
  }
  const passwordMatch = await verifyPassword(
    user.password_hash,
    req.body.password
  );
  if (!passwordMatch) {
    return responseFormatter(
      res,
      false,
      null,
      "Invalid username or password",
      401    
    );
  }
  return responseFormatter(
    res,
    true,
    generateToken(user,req.body.remember_me),
    "Welcome back! You’re signed in!",
    200
  );
};

module.exports = {
  signupService,
  signinService,
};
