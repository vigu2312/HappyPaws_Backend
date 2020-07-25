/************
 * Author: Moni Shah 
 **********/

 // Routes for Sharestory feature
const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const {share} = require('../api/shareyourstory');


router.route('/').post(auth, share);
module.exports = router;
