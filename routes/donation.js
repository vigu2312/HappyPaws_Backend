const express = require('express');
const router  = express.Router();
const {donate} = require('../api/donation');


router.route('/').post(donate);

module.exports = router;
