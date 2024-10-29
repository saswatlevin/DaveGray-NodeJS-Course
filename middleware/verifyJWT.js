const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    // Get the auth header from the http headers 
    const authHeader = req.headers['authorization']; 
    // If there's no bearer token in the auth header, then return Unauthorized.
    if (!authHeader) {
        console.log("AuthHeader / Bearer Token Not Found");
        return res.sendStatus(401); 
    }
    console.log("Authheader / Bearer Token: ", authHeader); // Bearer token

    // Get the access token from the bearer token
    const token = authHeader.split(' ')[1];
    // Verify the access token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid token
            req.user = decoded.username;
            next();
        }
    );

};

module.exports = verifyJWT;