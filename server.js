require('dotenv').config();
const { client } = require('./db');
// const todoController = require('./database/models/todo');

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
// const pgSession = require('connect-pg-simple');
var fs = require('fs');
const { resolve } = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

// const postgreStore = new pgSession(session);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// helpers

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function findUserByUsername(username_data) {
    try {
        // users = await User.findAll({ where: { email: email } })
        users = await client.query(
            `SELECT * FROM user_login_data WHERE username = $1;`,
            [
                username_data
            ],
            );

        // return users;
        return users.rows[0];
    }
    catch (ex) {
        throw ex;
    }
}

async function findUserByEmail(email_data) {
    try {
        // users = await User.findAll({ where: { email: email } })
        users = await client.query(
            `SELECT * FROM user_login_data WHERE email = $1;`,
            [
                email_data
            ],
            );

        // return users;
        return users.rows[0];
    }
    catch (ex) {
        throw ex;
    }
}

const getTodos = async (request, response) => {
    const res = await client.query('SELECT * FROM todo', (err, results) => {
        if (err) throw err;
    });
    console.log(res.rows)
}

// TODOSs

// api get all todos for user_id
app.get('/todo/byUserId', async (req, res) => {
    let { userId } = req.body;

    if (!userId) res.status(401).send({ "message": "userId required" });
    
    let data = await client.query('SELECT * FROM todo WHERE user_id = $1', [userId]);

    res.send(data.rows);
});


// api get a todo
// app.get('/todo', async (req, res) => {
//     await client.query('SELECT * FROM todo', (err, results) => {
//         if (err) throw err;
//         res.send(results.rows);
//     });
// });

// api get all todos for specific user id
app.get('/todo', async (req, res) => {
    await client.query('SELECT * FROM todo WHERE user_id = $1', [req.body[0].id],
        (err, results) => {
            if (err) throw err;
            res.send(results.rows);
        });
});

// api get specific todo by specific todo id
app.get('/todo', async (req, res) => {
    let { todo_id } = req.body;

    if (!todo_id) res.status(401).send({ "message": "todo_id required" });

    client.query('SELECT * FROM todo WHERE todo_id = $1', [todo_id],
        (err, results) => {
            // if a todo that id does not exist, return does not exist

            if (err) throw err;
            res.send(results.rows);
        });
        // res.send(await findUserByEmail(email));
});

// delete a specific todo
app.delete('/todo', async (req, res) => {
    // console.log(req.body[0].id);
    await client.query('DELETE FROM todo WHERE todo_id = $1', [req.body[0].todo_id],
        (err, results) => {
            if (err) res.status(500).send(JSON.stringify(err));
            console.log(results);
            res.status(200).send(`User modified with ID: ${req.body[0].todo_id}`);
        });
});

// add a new todo with user_id and todo_id
app.post('/todo', async (req, res) => {
    // console.log(req.body[0].id);
    await client.query('insert into todo (user_id, todo_id, title, content, completed) VALUES ($1, $2, $3, $4, $5);',
        [
            req.body[0].user_id,
            req.body[0].todo_id,
            req.body[0].title,
            req.body[0].content,
            req.body[0].completed,
        ],
        (err, results) => {
            if (err) res.status(500).send(JSON.stringify(err));
            console.log(results);
            res.status(200).send(`Rows added: ${results.rowCount}`)
        });
});

// update a todo 
app.put('/todo', async (req, res) => {
    const { user_id,
        todo_id,
        title,
        content,
        completed } = req.body[0];

    await client.query(
        'UPDATE todo SET title = $1, content = $2, completed = $3 WHERE todo_id = $4 RETURNING *',
        [
            title,
            content,
            completed,
            todo_id
        ],
        (error, results) => {
            if (error) {
                res.status(500).send(JSON.stringify(err));
            }
            console.log(results);
            res.status(200).send(`User modified with ID: ${todo_id}`)
        }
    )
});

// USERS

// get login user details by email
app.get('/user', async (req, res) => {
    let { email } = req.body;
    
    if (!email) {
        res.status(401).send({ "message": "all information required" });
        return;
    }
    res.send(await findUserByEmail(email));
})

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
        "user_id": getRandomInt(1, 1000),
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
})

// delete existing user

// update password for user

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}.`);
});