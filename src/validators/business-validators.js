const { z } = require('zod');
const responseFormatter = require("../utils/responser");

const businessSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1, "Business name is required"),
  abn: z.string().length(11, "ABN must be exactly 11 characters"),
  business_type: z.string().min(1, "Business type is required"),
  phone_number: z.string().min(10, "Phone number is required"),
  personal_phone_number: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  suburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
  pay_period: z.enum(["weekly", "fortnightly", "monthly"]),
  week_start: z.enum(["mon", "tue", "wed", "thurs", "fri"]),
  postcode: z.string().min(4, "Postcode must be at least 4 characters"),
  user_id: z.number().int(),
});

const validateBusinessData = (req, res, next) => {
  try {
    req.body = businessSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return responseFormatter(
        res,
        false,
        errorMessages,
        "Invalid request",
        422
      );
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = {
  validateBusinessData
};
