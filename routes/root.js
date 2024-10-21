const express = require('express');
const router = express.Router();
const path = require('path');

// This will allow us to route to 'index', '/index' and '/index/' with or without the '.html'
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views', 'index.html'));
});

// Route to /new-page or /new-page.html
router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views', 'new-page.html'));
});

// Does a permanent redirect to 'new-page.html'
// If the 301 wasn't specified, by default, a search engine would do a temporary redirect (302) 
router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

module.exports = router;