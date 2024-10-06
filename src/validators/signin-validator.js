const { z } = require("zod");

const signinValidator = z.object({
  email: z.string({
    required_error: "email is a required field",
    invalid_type_error: "email should be a string value",
  }).email("Invalid email format")
  ,

  password: z.string({
    required_error: "password is a required field",
    invalid_type_error: "password should be a string value",
  }).min(6, "password should be at least 6 characters long"),

  remember_me: z.boolean({
    required_error: "remember_me is a required field",
    invalid_type_error: "remember_me should be a boolean value",
  }),
});

module.exports = signinValidator;
