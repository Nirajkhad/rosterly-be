const Joi = require("joi");

const signinValidator = Joi.object({
  email: Joi.required().messages({
    "any.required": "email is a required field",
  }),

  password: Joi.required().messages({
    "any.required": "password is a required field",
  }),
});

module.exports = signinValidator;
