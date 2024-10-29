const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const handleNewUser = async (req, res) => {
    // The JSON required to create a user will be:
    // {"user": "Some value", "pwd": "Some value"}
    // 400 stands for Unauthorized Action.
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({'message': 'Username and Password required'});

    // Check for duplicate names in the database
    const duplicate = usersDB.users.find(person => person.username === user);
    console.log("duplicate: ", duplicate);
    if (duplicate) return res.sendStatus(409); // Conflict (409 stands for conflict) if duplicate user found

    try {
        // Encrypt the password
        // Return a salted and hashed password
        // Apply 10 rounds of salting to the password while hashing it
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const newUser = {"username": user, "password": hashedPwd};
        // Add the new user to the existing list of users
        // The user will be stored in a JSON {"username": "value", "password": "value"}.
        usersDB.setUsers([...usersDB.users, newUser]);

        // Write the user to file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );

        // Show all the users in the "users.json" file
        console.log(usersDB.users);
        res.status(201).json({'success': `New user ${user} created!`});

    } catch (err) {
        res.status(500).json({'message': err.message});
    }

}

module.exports = { handleNewUser };
