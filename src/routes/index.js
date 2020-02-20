const index = require('express').Router();

//Routes
index.get('/health', (req, res) => {
    res.status(200).send();
});

module.exports = index;