const express = require("express");
const healthCheck = require("../controllers/health-check-controller");

const router = express.Router();

router.get("/", healthCheck);


module.exports = router;