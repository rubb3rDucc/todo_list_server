const { client } = require('./db');

// helpers

// for the userID and todoID
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function findUserByUsername(username_data) {
    try {
        users = await client.query(
            `SELECT * FROM user_login_data WHERE username = $1;`,
            [
                username_data
            ],
        );
        return users.rows;
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

module.exports = {
    getRandomInt,
    findUserByUsername,
    findUserByEmail,
    getTodos
};