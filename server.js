require('dotenv').config();

const express = require('express');
const router = (global.router = (express.Router()));
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require("helmet");
const morgan = require('morgan');
const todosRoute = require('./api/todos');

const PORT = process.env.PORT || 7000;
const app = express();

app.use('/', todosRoute);
// app.use('/users', require('./routes/users'))
app.use(router);
// app.use(express.static(__dirname + '/api/todos.js'));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}.`);
});