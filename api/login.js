const express = require('express');
const app = express();
const helpers = require("./helpers");

// login checks passed in username and password, gives a token when they're matches
app.use('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log(req.body);

        // get username 
        const user = await helpers.findUserByUsername(username);
        console.log(user[0]);

        if (user[0].length === 0) {
            return res.status(401).json('ERROR: username is incorrect.');
        }

        const validPassword = password === user[0].password;

        if (!validPassword) {
            return res.status(401).json('ERROR: Password is incorrect.');
        }

        // set token
        res.send({
            token: 'test123'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

module.exports = app;