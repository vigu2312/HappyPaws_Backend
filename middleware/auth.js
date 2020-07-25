const jwt = require('jsonwebtoken');
const LoggedInUser = require('../models/LoggedInUser');


function auth(req, res, next) {
    const token = req.header('x-auth-token');
    req.token = token;
    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token. Authorization denied' });
    }

    if (token) {
        LoggedInUser.findOne({ token: token }).then(token => {
            if (!token) {
                return res.status(400).json({msg: 'Unvalid token'});
              
            }
          }).catch(err => {
            console.log(err);
            return res.status(400).json({ success: false, })
          });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user from payload
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({msg: 'Unvalid token'})
    }

};

module.exports = auth;
