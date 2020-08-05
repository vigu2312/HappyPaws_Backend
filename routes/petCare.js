const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const {petCare} = require('../api/petCare');


//GET Route
router.route('/').get(petCare);


module.exports = router;