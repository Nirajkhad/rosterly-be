const express = require("express");
const authRoute = require("./routers/auth-routerjs");
const bodyParser = require("body-parser");
const { verifyUser } = require("./middlewares/auth-middleware");
const responseFormatter = require("./utils/responser");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.APP_PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Public routes
app.get("/", async (req, res) => {
  try {
    // Check if the database connection is alive
    await sequelize.authenticate();

    // If the connection is successful, return a healthy status\
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
      "Server is facing some issue while starting",
      500
    );
  }
});

app.use("/auth", authRoute);

//Protected routes
app.use(verifyUser);

app.get("/test/auth", (req, res) => {
  res.send("Hello World from Express.js!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
