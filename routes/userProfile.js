/************
 * Author: Devam Shah 
 **********/

 
 // Routes for User profile management feature
 const express = require('express');
 const router = express.Router();
 const auth = require('../middleware/auth')
 const { aboutMe, fetchAboutMe, accountSettings } = require('../api/userProfile');
 

 
 router.route('/aboutMe').post(aboutMe);
 router.route('/aboutMe').get(fetchAboutMe);
 router.route('/accountSettings').post(accountSettings);

 
 module.exports = router;
 