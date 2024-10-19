const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//Express.js works like a waterfall. It first goes to a route '/', then to the route with '/index.html' and so on
// Wildcards can be included in the routes
// '^/'    -> Starting with a /
// '$|/'   -> Ending with a /
// (text)? -> Doesn't include 'text'

// All the app.get(), app.post(), etc. are called Route Handlers. 

// Middleware is anything that goes between the request and the response.
// Route handlers are middleware.
// There are 3 types of middleware: built-in, custom and 3rd-party.
// app.use() is often used to apply middleware.

// Middleware also works like a waterfall. So, if we apply any middleware in a line that's above
// all routes, so that middleware will apply to all routes.

/** MIDDLEWARE */

// Built-in middleware to handle form data (url encoded; "application/x-www-form-urlencoded")
app.use(express.urlencoded({extended: false}));

// Built-in middleware for JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// This will allow us to route to 'index', '/index' and '/index/' with or without the '.html'
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to /new-page or /new-page.html
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Does a permanent redirect to 'new-page.html'
// If the 301 wasn't specified, by default, a search engine would do a temporary redirect (302) 
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

// The next() function directs the flow of control to the next route
// Here, after trying to load old-page.html, the next arrow fn inside it would be executed.
// If that arrow fn wasn't there, then, we would be directed to the 404.html page due to the last route.
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next();

}, (req, res) => {
    res.send('Hello World');
});

// Redirects any url other than 'index', 'new-page' or 'old-page' to the 404.html page with status code 404.
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log("Server running on port", PORT));


