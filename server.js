const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvents = require('./logEvents.js');
//const EventEmitter = require('events');


//class MyEmitter extends EventEmitter {};

// Initialize object
//const myEmitter = new MyEmitter();

// Add listener for the log event
// Here, we first specify the event type('log') thet we're listening for
// followed by an anon fn to pass the message to the logEvents fn
//myEmitter.on('log', (msg) => logEvents(msg));

// Here, we create the emitter function
// and set a delay of 2000 ms
/*setTimeout(() => {
    // Emit event
    myEmitter.emit('log', 'Log event emitted');
}, 2000);*/

// Server Code
const PORT = process.env.PORT || 3500;


/* const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // Undefined variable 
    let filePath;
    // Logic to serve page
    if (req.url === '/' || req.url === 'index.html') {
        // Set Status Code
        res.statusCode = 200;
        // Set HTTP Header Content
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        // Read File
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.end(data);
        });
    }
}); */

// File serving function
const serveFile = async (filePath, contentType, response) => {
    try {
        // Supports images and also text / html / json / etc data
        var encoding;

        if (contentType.includes('image') == true) {
            encoding = '';
        }

        else {
            encoding = 'utf8';
        }

        console.log("Content Type:", contentType, "encoding:", encoding);

        const rawData = await fsPromises.readFile(
            filePath, 
            encoding
        );
        
        // Parse the data if it is of type jso, otherwise not
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

        // Send a response header to the incoming request
        response.writeHead(200, {'Content-Type': contentType});
        
        // End the response by sending data
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

        console.log("==========================END==========================\n");

    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log("URL->", req.url, "METHOD->", req.method);

    // Get the path from the extension name
    const extension = path.extname(req.url);
    console.log("extension:", extension);
    
    let contentType;

    // Determine the content type based on file extension
    switch(extension) {
        case '.css':
            contentType = 'text/css';
            break;
        
        case '.js':
            contentType = 'text/javascript';
            break;
        
        case '.json':
            contentType = 'application/json';
            break;
        
        case '.jpg':
            contentType = 'image/jpg';
            break;

        case '.jpeg':
            contentType = 'image/jpeg';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.txt':
            contentType = 'text/plain';
            break;
        
        default:
            contentType = 'text/html';
    }

    console.log("Content Type:", contentType);

    if (contentType === 'text/html' && req.url === '/' ) {
        filePath = path.join(__dirname, 'views', 'index.html');
        console.log("filePath", filePath);
        //console.log("\n");
    }

    // The slice(-1) refers to the last character in the requested URL
    else if (contentType === 'text/html' && req.url.slice(-1) === '/') {
        // The req.url provides the path to the "subdir" folder
        filePath = path.join(__dirname, 'views', req.url, 'index.html');
        console.log("filePath", filePath);
        //console.log("\n");
    }

    else if (contentType === 'text/html') {
       filePath = path.join(__dirname, 'views', req.url);
       console.log("filePath", filePath);
       //console.log("\n");
    }

    else {
        filePath = path.join(__dirname, req.url);
        console.log("filePath", filePath);
        //console.log("\n");
    }


    if (!extension && req.url.slice(-1) !== '/') {
        console.log("filePath", filePath);
        //console.log("\n");
        filePath = filePath + ".html";
    }

    // Returns a boolean value
    const fileExists = fs.existsSync(filePath);


    /** FILE SERVING LOGIC **/
    if (fileExists) {
        // Serve the file
        serveFile(filePath, contentType, res);
    }

    else {
        
        // Serve a 301 (redirect) response
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                // End the response w/o sending data
                res.end();
                console.log("==========================END301==========================\n");
                break;

            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                // End the response w/o sending data
                res.end();
                console.log("==========================END301==========================\n");
                break;

            default:
                // Serve a 404 (not found) response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
                console.log("==========================END404==========================\n");
        }
        //console.log(path.parse(filePath));
    }
});

// Listen for incoming requests.
server.listen(PORT, () => console.log("Server running on port ", PORT));
console.log("\n");
