const { client } = require('../db.js');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const helpers = require("./helpers");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// USERS

// get login user details by email
app.get('/user', async (req, res) => {
    let { email } = req.body;

    if (!email) {
        res.status(401).send({ "message": "all information required" });
        return;
    }
    res.send(await helpers.findUserByEmail(email));
});

// add new user
app.post('/user', async (req, res) => {
    let { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(401).send({ "message": "all information required" });
        return;
    }

    let account = {
        // "type": "account",
        // "user_id": UUID.v4(),
        "user_id": helpers.getRandomInt(1, 1000),
        "username": username,
        // "password": bcrypt.hashSync(password, salt), will add when I do auth, right it's just basics
        "password": password,
        "email": email
    }

    client.query(
        `INSERT INTO user_login_data (user_id, username, email, password) VALUES ($1, $2, $3, $4);`,
        [
            account.user_id,
            account.username,
            account.email,
            account.password],
        (err, results) => {
            if (err) throw err;
        });
    console.log(`New user added to user_login_data table.`)
});