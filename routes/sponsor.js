const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const {sponsor, sponsorInfo} = require('../api/sponsor');
// const {sponsorInfo} = require('../api/sponsor');

// POST Route
router.route('/').post(sponsor);

//GET Route
router.route('/:id').get(sponsorInfo);


module.exports = router;
