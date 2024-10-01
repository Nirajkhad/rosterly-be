const express = require('express');
const authRoute  = require('./routers/auth-routerjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.APP_PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World from Express.js!');
});
app.use('/auth', authRoute);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

