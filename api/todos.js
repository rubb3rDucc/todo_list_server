const { client } = require('./db');
const express = require('express');
const app = express();
const helpers = require("./helpers");

// TODOSs

// api get all todos for user_id
app.post('/todo/byUserId', async (req, res) => {
    let { userId } = req.body;
    // if (!userId) res.status(401).send({ "message": "userId required" });
    let data = await client.query('SELECT * FROM todo WHERE user_id = $1', [userId]);
    res.send({ data });
});

// api get all todos for specific user id
app.get('/todo', async (req, res) => {
    let { id } = req.body[0];

    if (!id) res.status(401).send({ "message": "user_id required" });

    await client.query('SELECT * FROM todo WHERE user_id = $1', [id],
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
});

// delete a specific todo
app.delete('/todo', async (req, res) => {
    let { todo_id } = req.body;

    if (!todo_id) return "missing todo_id";

    await client.query('DELETE FROM todo WHERE todo_id = $1', [todo_id],
        (err, results) => {
            if (err) res.status(500).send(JSON.stringify(err));
            console.log(results);
            res.status(200).send(`User modified with ID: ${todo_id}`);
        });
});

// add a new todo with user_id and todo_id
app.post('/todo', async (req, res) => {
    if (!req.body.user_id) return "missing user_id";

    await client.query('insert into todo (user_id, todo_id, title, content, completed) VALUES ($1, $2, $3, $4, $5)',
        [
            req.body.user_id,
            req.body.todo_id,
            req.body.title,
            req.body.content,
            req.body.completed,
        ],
        (err, results) => {
            if (err) res.status(500).send(JSON.stringify(err));
            console.log(results);
            res.status(200).send(`Rows added: ${results.rowCount}`);
        });
});

// update a todo 
app.put('/todo', async (req, res) => {
    const { user_id,
        todo_id,
        title,
        content,
        completed } = req.body[0];

    // catch

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
                res.status(500).send(JSON.stringify(error));
            }
            console.log(results);
            res.status(200).send(`User modified with ID: ${todo_id}`)
        }
    )
});

// toggle the complete/not complete bool
app.put('/todo/toggleCompleted', async (req, res) => {
    const { todo_id, user_id, completed } = req.body;
    // console.log(todo_id, user_id, completed);
    // if (!user_id || !todo_id || !completed)
    // {
    //     return "Missing Info for toggling the todo completed";
    // }
    
    // console.log(todo_id, user_id, completed);

    await client.query('UPDATE todo SET completed = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
        [
            completed,
            todo_id,
            user_id
        ],
        (err, results) => {
            if (err) 
            {
                res.status(500).send(JSON.stringify(err));
            }
            // console.log(results);
            res.status(200).send(`Todo with ID: ${todo_id} modified for user ID: ${user_id}`);
        }
    );

});