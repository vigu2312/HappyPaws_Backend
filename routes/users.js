const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { register, login, userDetails, logout, editProfile, forgetPassword } = require('../api/user');

//User Model
const User = require('../models/User');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/userDetails').get(auth, userDetails);
router.route('/forgetPassword').put(auth, forgetPassword);
router.route('/editProfile').put(auth, editProfile);
router.route('/logout').get(auth, logout);

module.exports = router;
