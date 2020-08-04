/************
 * Author: Ramya Ramathas
 **********/

const express = require('express');
const router = express.Router();
const { contactUs } = require('../api/contact-us');

//contact data model
const Contact = require('../models/Contactus-data');

//routes for contact us page
router.route('/').post(contactUs);

module.exports = router;