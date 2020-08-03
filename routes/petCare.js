const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const {petCare} = require('../api/petCare');
// const {sponsorInfo} = require('../api/sponsor');
console.log("Inside petCare route")
// POST Route
// router.route('/').post(sponsor);

//GET Route
router.route('/').get(petCare);


module.exports = router;