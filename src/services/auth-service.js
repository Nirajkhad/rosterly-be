const { createUser } = require("../dtos/user");
const { store, findOne } = require("../repositories/user-repository");
const { hashPassword, verifyPassword } = require("../utils/argon");
const { generateToken } = require("../utils/jwt");
const responseFormatter = require("../utils/responser");
const signinValidator = require("../validators/signin-validator");
const signupValidator = require("../validators/signup-validators");

const signupService = async (req, res) => {
  const { error } = signupValidator.validate(req.body);
  if (error) {
    return responseFormatter(
      res,
      false,
      null,
      "Unprocessable Content",
      422,
      error.details.map((err) => err.message)
    );
  }
  const existingUser = await findOne({ email: req.body.email });
  if (existingUser) {
    return responseFormatter(
      res,
      false,
      null,
      "Unprocessable Content",
      422,
      ["User already exists"]
    );
  }
  const passwordHashed = await hashPassword(req.body.password);
  const user = await store(createUser(req.body, passwordHashed));
  return responseFormatter(
    res,
    true,
    generateToken(user),
    "User is authenticated successfully",
    200
  );
};

const signinService = async (req, res) => {
  const { error } = signinValidator.validate(req.body);
  if (error) {
    return responseFormatter(
      res,
      false,
      null,
      "Unprocessable Content",
      422,
      error.details.map((err) => err.message)
    );
  }
  const user = await findOne({ email: req.body.email });
  if (!user) {
    return responseFormatter(
      res,
      false,
      null,
      "Unauthorized",
      401,
      ["Invalid username or password"]
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
      "Unauthorized",
      401,
      ["Invalid username or password"]
    );
  }
  return responseFormatter(
    res,
    true,
    generateToken(user,req.body.remember_me),
    "User a authenticated successfully",
    200
  );
};

module.exports = {
  signupService,
  signinService,
};
