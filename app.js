/************
 * Author: Moni Shah 
 **********/

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cors = require('cors');
dotenv.config({ path: './config/config.env' });
const path = require('path');

// connecting to DB
connectDB();

app.use(morgan('HappyPaws'));

// Adding cors configuration
app.use(cors());

// For parsing json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// calling the routes file
app.use('/users', require('./routes/users'));
app.use('/sharestory', require('./routes/shareyourstory'))
app.use('/donation', require('./routes/donation'));
app.get('/', (req, res) => res.send("Hello"));

module.exports = app;