const words = require('../data/db.json');

exports.getWord = (req, res) => {
    const { hangmanWords } = words;
    const randomIndex = Math.floor(Math.random() * hangmanWords.length);
    res.json(hangmanWords[randomIndex]);
};