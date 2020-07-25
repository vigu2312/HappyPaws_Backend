const express = require('express');
const router = express.Router();

const {volFn, VolunteerRegister} = require('../api/volunteer');


const volunteer = require('../models/Volunteer');

router.route('/volunteer').post(VolunteerRegister);
router.route('/').get(volFn);

module.exports = router;
