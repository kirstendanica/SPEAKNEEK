const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Chat route
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    console.log('Received message:', message);
    
    // Basic response mechanism (in progress)
    const response = `AYEW! Did u just say...: "${message}"? Interesting actewlly, but not as much as crickets though... righewt?`;
    
    res.json({ message: response });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));