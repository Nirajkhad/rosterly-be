const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World from Express.js!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

