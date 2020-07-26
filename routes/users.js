/************
 * Author: Moni Shah 
 **********/

 
 // Routes for User profile management feature
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { register, login, userDetails, logout, editProfile, forgetPassword, forgetPasswordMail } = require('../api/user');

//User Model
const User = require('../models/User');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/userDetails').get(auth, userDetails);
router.route('/forgetPassword').put(forgetPassword);
router.route('/forgetPasswordMail').post(forgetPasswordMail);
router.route('/editProfile').put(auth, editProfile);
router.route('/logout').get(auth, logout);

module.exports = router;
