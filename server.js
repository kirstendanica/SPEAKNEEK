const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('The habitat preparations are on!');
});

app.listen(port, () => {
    console.log(`Server SPEAKNEEK listening on ${port}`);
})

app.use(express.static('public'))