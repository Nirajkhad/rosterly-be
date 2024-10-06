const { z } = require("zod");

const signupValidator = z
  .object({
    full_name: z
      .string({
        required_error: "full_name is a required field",
        invalid_type_error: "full_name should be a string value",
      })
      .min(3, { message: "full_name should have a minimum length of 3" })
      .max(100, { message: "full_name should have a maximum length of 100" })
      .min(1, { message: "full_name cannot be an empty field" }),

    email: z
      .string({
        required_error: "email is a required field",
        invalid_type_error: "email should be a string value",
      })
      .email({ message: "email must be a valid email" })
      .min(1, { message: "email cannot be an empty field" }),

    password: z
      .string({
        required_error: "password is a required field",
        invalid_type_error: "password should be a string value",
      })
      .min(6, { message: "password should have a minimum length of 6" })
      .max(255, { message: "password should have a maximum length of 255" })
      .min(1, { message: "password cannot be an empty field" }),

    confirm_password: z
      .string({
        required_error: "confirm password is a required field",
        invalid_type_error: "confirm password should be a string value",
      })
      .min(1, { message: "confirm password cannot be an empty field" }),

    phone_number: z
      .string({
        required_error: "phone number is a required field",
        invalid_type_error: "phone_number should be a string value",
      })
      .regex(/^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/, {
        message: "phone_number must be a valid Australian phone number",
      }),

    user_type: z.enum(["admin", "user"], {
      required_error: "user_type is a required field",
      invalid_type_error: "user_type must be one of [admin, user]",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "confirm password must match password",
    path: ["confirm_password"], // This will specify which field to attach the error to
  });

module.exports = signupValidator;
