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

// require('./middleware/passport')(passport);

connectDB();

app.use(morgan('HappyPaws'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', require('./routes/users'));
app.use('/sharestory', require('./routes/shareyourstory'))
app.use('/donation', require('./routes/donation'));
app.get('/', (req, res) => res.send("Hello"));

module.exports = app;

// app.use(express.static('../FrontEnd/', {index: 'index.html'}));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + './FrontEnd/build/index.html'));
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
