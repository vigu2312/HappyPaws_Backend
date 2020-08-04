/************
 * Author: Moni Shah 
 * Author: Vigneshwari Ravichandran
 * Author: Ramya Ramathas
 * Author: Devam Shah
 * Author: Bhagyashree Pandit  
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
 console.log("APP.js test")

app.use(morgan('HappyPaws'));

// Adding cors configuration
app.use(cors());
// For parsing json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// calling the routes file
app.use('/users', require('./routes/users'));
app.use('/sharestory', require('./routes/shareyourstory'));
app.use('/donation', require('./routes/donation'));
app.use('/volunteer', require('./routes/volunteer.js'));
app.use('/adopt', require('./routes/adopt.js'));
app.use('/search', require('./api/search'));
app.use('/profile', require('./routes/profile-routes.js'));
app.use('/enquiry',require('./routes/enquiry.js'));
app.use('/sponsor', require('./routes/sponsor.js'));
app.use('/petCare', require('./routes/petCare.js'));
app.use('/userProfile', require('./routes/userProfile'));
app.use('/contactus',require('./routes/contactUs.js'));

app.get('/', (req, res) => res.send("Hello"));

module.exports = app;