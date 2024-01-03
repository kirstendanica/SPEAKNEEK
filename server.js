
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler: for requests that don't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));

// Set up route to homepage
app.get('/', (req, res) => {
    res.send('The habitat preparations are on!');
});