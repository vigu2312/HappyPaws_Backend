const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const {sponsor, sponsorInfo} = require('../api/sponsor');
// const {sponsorInfo} = require('../api/sponsor');

console.log("Inside Routes")
router.route('/').post(sponsor);
router.route('/:id').get(sponsorInfo);


module.exports = router;
