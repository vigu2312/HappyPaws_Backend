/************
 * Author: Ramya Ramathas
 **********/

 const express = require('express');
const router = express.Router();
const { petEnquire, petInfo } = require('../api/enquire');

//Enquire data model
const Enquire = require('../models/Enquire-data');

//routes for enquiry page
router.route('/').post(petEnquire);
router.route('/:id').get(petInfo);

module.exports = router;
