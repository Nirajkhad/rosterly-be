const Joi = require("joi");

const signupValidator = Joi.object({
    full_name: Joi.string().min(3).max(100).required().messages({
        "string.base": 'full_name should be a type of text',
        "string.empty": 'full_name cannot be an empty field',
        "string.min": 'full_name should have a minimum length of {#limit}',
        "any.required": 'full_name is a required field',
    }),

    email: Joi.string().email().required().messages({
        "string.base": 'email should be a type of text',
        "string.empty": 'email cannot be an empty field',
        "string.email": 'email must be a valid email',
        "any.required": 'email is a required field',
    }),

    password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .messages({
            "string.base": 'password should be a type of text',
            "string.empty": 'password cannot be an empty field',
            "string.min": 'password should have a minimum length of {#limit}',
            "any.required": 'password is a required field',
        }),

    confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            "string.base": 'confirm password should be a type of text',
            "string.empty": 'confirm password cannot be an empty field',
            "any.only": 'confirm password must match password',
            "any.required": 'confirm password is a required field',
        }),

    phone_number: Joi.string()
        .pattern(/^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/)
        .optional()                                    
        .messages({
            "string.pattern.base":
                'phone_number must be a valid Australian phone number',
        }),

    user_type: Joi.string().valid("admin", "user").required().messages({
        "any.only": 'user_type must be one of [admin, user]',
        "any.required": 'user_type is a required field',
    }),
});

module.exports = signupValidator;
