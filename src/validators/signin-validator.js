const { z } = require("zod");

const signinValidator = z.object({
  email: z.string().nonempty({ message: "email is a required field" }),

  password: z.string().nonempty({ message: "password is a required field" }),

  remember_me: z.boolean({
    required_error: "remember_me is a required field",
    invalid_type_error: "remember_me should be a boolean value",
  }),
});

module.exports = signinValidator;
