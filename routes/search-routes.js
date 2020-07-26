const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { search, petRequest, addPet} = require('../api/search');

//User Model
const User = require('../models/User');

router.route('/search').get(search);
router.route('/petRequest').post(petRequest);
router.route('/addPet').get(auth, addPet);

module.exports = router;
