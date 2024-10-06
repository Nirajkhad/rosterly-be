const healthStatus = async(res) => {
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
}

module.exports =  healthStatus