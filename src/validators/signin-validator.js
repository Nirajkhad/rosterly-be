const Joi = require("joi");

const signinValidator = Joi.object({
  email: Joi.required().messages({
    "any.required": "email is a required field",
  }),

  password: Joi.required().messages({
    "any.required": "password is a required field",
  }),

  remember_me: Joi.boolean().required().messages({
    "any.required": "remember_me is a required field",
    "boolean.base": "remember_me should be a boolean value",
  }),
});

module.exports = signinValidator;
