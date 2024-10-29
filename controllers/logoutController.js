const fsPromises = require('fs').promises;
const path = require('path');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const handleLogout = async (req, res) => {
    // Get the cookies from the request 
    const cookies = req.cookies;

    // If there's no cookes in the request
    if (!cookies?.jwt) {
        return res.sendStatus(204); 
    }

    //console.log(cookies.jwt);
   
    // Get the refresh token from the Cookie in JWT 
    const refreshToken = cookies.jwt;

    // Check whether the user exists in the refresh token, and if so get it
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    
    // If the user isn't found, 
    if (!foundUser) {
        // Delete the JWT entirely
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // Change to httpsOnly for production grade code
        return res.sendStatus(204); // JWT succesfully deleted
    };

    // If the user is found in the JWT, then delete the refresh token from the user
    // Reflect this change in the users database
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);

    // Set the refresh token to an empty string
    const currentUser = { ...foundUser, refreshToken: ''};
    // Add the current user to the users database
    usersDB.setUsers([...otherUsers, currentUser]);

    // Write the users databse to the users.json file
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    // Delete the JWT
    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // Change to httpsOnly for production grade code
    // JWT succesfully deleted
    res.sendStatus(204); 
};

module.exports = { handleLogout };