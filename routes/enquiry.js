const express = require('express');
const router = express.Router();
const { petEnquire, petInfo } = require('../api/enquire');

const Enquire = require('../models/Enquire-data');

router.route('/').post(petEnquire);
router.route('/:id').get(petInfo);

module.exports = router;
