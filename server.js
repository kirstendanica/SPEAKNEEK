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

mongoose.connect('mongodb://localhost/speakneek');

const generateResponse = (message) => {
    const responses = {
        crickets: ["Crickets are my faaaaaaavewrit snack hewman.", "Blah blah- oh! Yew say crickets? Yes...???! YUM!"],
        worms: ["Worms? Crickets? How about ....... both?", "Worms. That is all, hewman.", "Did yew know, hewman, that the protein from mealwewrms = reptile sweet spot?",
            "Worms, I hear? How about some nice juicy superworms, hewman?!!!1"
        ],
        sleep: ["I love my naps more than I love my cricke-hmm, no... That is not it...", "Crepuscular, hewman. Learn it. Do not disturb till dusk... deal?"],
        hidey: ["Hide and seek? More like hide and NEEEEK!!", "I have the best hideyspot-good work, hewman.",
            "Us gecks need our hideys to feel safe and sound; hidey = the getaway from heat, light or strange hewmans."
        ],
        default: [
            "AYEW! Did u just say...? Go on, hewman?",
            "Hmmm, that's interesting! Tell me more!",
            "I'm not sure I understand, hewman... but I'm listening. I am..*snortle*",
            "You hewmans say the scaliest things, dontcha?",
            "I gotta say, hewman - I appreciate you and I'm proud of you - - - even though I may seem sassy and I AM a cold-blooded being, I meawn it. ☺"
        ]
    };

    const lowercaseMessage = message.toLowerCase();
    for (const [keyword, replies] of Object.entries(responses)) {
        if (lowercaseMessage.includes(keyword)) {
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
    return responses.default[Math.floor(Math.random() * responses.default.length)];
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
