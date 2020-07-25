const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { profile} = require('../api/profile');

//User Model
const User = require('../models/User');

router.route('/:id').get(profile);

module.exports = router;
