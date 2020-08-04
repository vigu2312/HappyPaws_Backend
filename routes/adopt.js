/************
 * Author: Vigneshwari Ravichandran
 **********/

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {petInfoAdopt, AdoptRegister} = require('../api/adopt');

//adopt model
const adopt = require('../models/Adopt');

//routes for adopt page
router.route('/adopt').post(auth,AdoptRegister);
router.route('/:id').get(petInfoAdopt);
//router.route('/').get(adoptTest);

module.exports = router;
