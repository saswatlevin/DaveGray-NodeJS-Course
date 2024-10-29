const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const handleRefreshToken = async (req, res) => {
    // Get the cookies from the request 
    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.sendStatus(401); 
    }

    console.log(cookies.jwt);
   
    // Get the refresh token from the Cookie in JWT 
    const refreshToken = cookies.jwt;

    // Check whether the user exists in the refresh token, and if so get it
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden
    
    // Evaluate JWT
    // Verify the refresh token and issue a new access token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username != decoded.username) {
                return res.sendStatus(403);   
            }

            const accessToken = jwt.sign(
                {'username': decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '600s'}
            );

            res.json({ accessToken });
        }

    );

};

module.exports = { handleRefreshToken };