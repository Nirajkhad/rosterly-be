const express = require("express");
const authRoute = require("./routers/auth-router.js");
const healthCheckRoute = require("./routers/health-check-router.js");
const bodyParser = require("body-parser");
const { verifyUser } = require("./middlewares/auth-middleware");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found-middleware.js");
const businessRouter = require('./routers/business');

const app = express();
const PORT = process.env.APP_PORT || 8000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Public routes
app.use("/", healthCheckRoute);

app.use("/auth", authRoute);
app.use(businessRouter);

//Protected routes
app.get("/test/auth", verifyUser, (req, res) => {
  res.send("Hello World from Express.js!");
});

app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
