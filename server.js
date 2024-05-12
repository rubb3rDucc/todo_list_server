require('dotenv').config();
const { client } = require('./db');

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require("helmet");
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}.`);
});