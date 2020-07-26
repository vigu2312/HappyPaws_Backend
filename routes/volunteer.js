/************
 * Author: Vigneshwari Ravichandran
 **********/

 const express = require('express');
const router = express.Router();

const {volFn, VolunteerRegister} = require('../api/volunteer');

//volunteer model
const volunteer = require('../models/Volunteer');

//routes for volunteer page
router.route('/volunteer').post(VolunteerRegister);
router.route('/').get(volFn);

module.exports = router;
