const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

mongoose.connect('mongodb://localhost/spekneek', { useNewUrlParser: true, useUnifiedTopology: true });

const generateResponse = (message) => {
    const keywords = ["crickets", "worms", "sleep", "hidey"];
    let response = `AYEW! Did u just say...: "${message}"? ... go on, hewman?`;
    keywords.forEach(keyword => {
        if (message.toLowerCase().includes(keyword)) {
            response = `Hmmmmmm, that sounds good, hewman. Great actually. I love ${keyword}!`;
        }
    });
    return response;
};

// Chat route
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    console.log('Received message:', message);
    
    const response = generateResponse(message);
    
    res.json({ message: response });
});

// User registration route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
});

// User login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Cannot validate username or password. Please try again.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Cannot validate username or password. Please try again.' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ token });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
