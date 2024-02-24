const {client} = require('./../../db');

// api get all todos
const getTodos = (request, response) => {
    client.query('SELECT * FROM todo', (error, results) => {
        if (error) throw error;        
        response.status(200).json(results.rows)
    });
}

module.exports = {
    get: getTodos(),
}