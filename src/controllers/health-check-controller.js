const healthStatus = require("../services/health-check-service");
const responseFormatter = require("../utils/responser");

const healthCheck = async (req, res) => {
  try {
    return await healthStatus(res);
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
};

module.exports =  healthCheck;
