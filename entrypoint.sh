#!/bin/sh

# Run Sequelize migrations
npx sequelize-cli db:migrate

# Start the application
npm start
