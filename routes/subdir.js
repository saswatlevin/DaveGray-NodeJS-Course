const express = require('express');
const router = express.Router();
const path = require('path');

/** ROUTES FOR THE SUBDIR FOLDER */

// This will allow us to route to 'index', '/index' and '/index/' with or without the '.html'
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

// Route to /test or /test.html
router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

module.exports = router;