const { Client, Pool } = require('pg');
require('dotenv').config();

const db_url = process.env.DATABASE_URL;

const client = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

client.connect((err)=>{
    if (err) throw err;
    console.log("Connected to Database.");
});

module.exports = {client}