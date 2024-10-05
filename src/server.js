const express = require("express");
const authRoute = require("./routers/auth-routerjs");
const bodyParser = require("body-parser");
const { verifyUser } = require("./middlewares/auth-middleware");
const responseFormatter = require("./utils/responser");
const { sequelize } = require("./models");
const cors = require('cors');
const { z } = require('zod'); 
// const Business = require("./models/business");
const db = require("./models"); 
const Business = db.Business; 



const app = express();
const PORT = process.env.APP_PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Zod schema for business validation
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

// Middleware for validating business data
const validateBusinessData = (req, res, next) => {
  try {
    // Validate request body using Zod schema
    req.body = businessSchema.parse(req.body);
    next(); // Move to the next middleware/route handler if valid
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    // Handle unexpected errors
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Public routes
app.get("/", async (req, res) => {
  try {
    // Check if the database connection is alive
    await sequelize.authenticate();

    // If the connection is successful, return a healthy status
    return responseFormatter(
      res,
      true,
      {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      "Server is healthy",
      200
    );
  } catch (error) {
    return responseFormatter(
      res,
      true,
      {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      "Server is facing some issues while starting",
      500
    );
  }
});

// app.use("/auth", authRoute);

// Protected routes
// app.use(verifyUser);

// Example API route to save business data
app.post("/api/business", async (req, res) => {
  try {
    const { uuid, name, abn, business_type, phone_number, personal_phone_number, address, suburb, state, pay_period, week_start, postcode, user_id } = req.body;

    console.log(name);
    // return res.status(200).json({
    //   message: "Request body received.",
    //   body: req.body,
    // });

    // Create a new business entry
    const newBusiness = await Business.create({
      name:"rai suraj"
    });
    
    // const newBusiness = await Business.create({
    //   uuid,
    //   name,
    //   abn,
    //   business_type,
    //   phone_number,
    //   personal_phone_number,
    //   address,
    //   suburb,
    //   state,
    //   pay_period,
    //   week_start,
    //   postcode,
    //   user_id
    // });

    return res.status(201).json(newBusiness);
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: 'An error occurred while saving the business.' });
    console.error("Error creating business:", error); // Log the error
    return res.status(500).json({ error: 'An error occurred while saving the business.', details: error });
  }
});

// Test route
app.get("/test/auth", (req, res) => {
  res.send("Hello World from Express.js!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
