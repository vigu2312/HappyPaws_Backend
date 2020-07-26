/************
 * Author: Moni Shah 
 **********/
const User = require('../models/User');
const LoggedInUser = require('../models/LoggedInUser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


// POST API call: for registering user
exports.register = (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Validations 
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }

        User.findOne({ email })
            .then(user => {
                if (user) return res.status(400).json({ msg: 'User already exists' })
            })

        const newUser = new User({
            name, email, password
        })

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        // JWT token
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: 7200 },
                            (err, token) => {
                                if (err) throw err;
                                const loggedInUser = new LoggedInUser({ token });
                                loggedInUser.save()
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )

                    });
            });
        });
    } catch (err) {
        console.log(err)
    }
}

// POST API call: for logging user
exports.login = (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validations 
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }

        User.findOne({ email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist', status: 400 })
                if (user) {

                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials', status: 400 })
                            // JWT token
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 7200 },
                                (err, token) => {
                                    if (err) throw err;
                                    const loggedInUser = new LoggedInUser({ token });
                                    loggedInUser.save()
                                    res.status(200).json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        })
                }

            })
    } catch (err) {
        console.log(err)
    }
}

// GET API call:Fetching user details
exports.userDetails = (req, res, next) => {
    try {
        User.findById(req.user.id)
            .select('-password')
            .then(user => res.json(user));
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, msg: 'Something went wrong' })
    }

}

// GET API CALL: for logout
exports.logout = (req, res, next) => {

    try {
        LoggedInUser.findOneAndDelete({ token: req.token })
            .then(res => {
                return res.status(200).json({ mssg: "OK", success: true });
            }).catch(err => {
                console.log(err)
                return res.status(400).json({ status: 400, msg: 'Something went wrong' })
            })
    } catch (err) {
        console.log(e);
        return res.status(400).json({ status: 400, msg: 'Something went wrong' })
    }


}

// PUT API CALL : Forget password method
exports.forgetPassword = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }
        User.findOne({ email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist', status: 400 })

                if (user) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            const newPassword = hash;

                            User.findOneAndUpdate({ email: user.email }, { $set: { password: newPassword } }, { new: true }, (err, doc) => {
                                if (err) {
                                    console.log("Something wrong when updating data!");
                                }
                                return res.status(200).json({
                                    msg: "OK",
                                    success: true
                                });
                            })

                        });
                    });
                }
            })
    } catch (error) {

    }
}
/*Reference taken from https://www.w3schools.com/nodejs/nodejs_email.asp*/
// POST API CALL: sending mail to reset a new password
exports.forgetPasswordMail = (req, res, next) => {

    const { email } = req.body

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist', status: 400 })
        })

    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 589,
            secure: false,
            auth: {
                user: 'happypaws5709@gmail.com',
                pass: 'Webgroup6'
            }
        }))

        var mailOptions = {
            from: 'happypaws5709@gmail.com',
            to: email,
            subject: 'Reset your password : HappyPaws ',
            html: 'Dear Customer,<br> Please navigate to the link to reset your password http://happypaws-a2.herokuapp.com/forgetPassword',
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                transporter.close();
                return res.status(400).json({ ststus: 400, msg: 'Something went wrong' })

            } else {
                console.log('Email sent: ' + info.response);
                transporter.close();
                return res.status(200).json({ status: 200, msg: 'OK' })
            }

        });
    }
    catch (err) {
        res.json({ message: err });
    }

};

// PUT API CALL: to update Edit profile
exports.editProfile = (req, res, next) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }
        User.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ msg: 'User already exists' })
                }
                if (!user) {
                    User.findOneAndUpdate({ _id: req.user.id }, { $set: { email: email, name: name } }, { new: true }, (err, doc) => {
                        if (err) {
                            console.log("Something wrong when updating data!");
                            return res.status(400).json({ success: false, })
                        }
                        return res.status(200).json({
                            msg: "OK",
                            success: true,
                            user: {
                                email: doc.email,
                                name: doc.name
                            }
                        });
                    })
                }
            })

    } catch (error) {

    }
}
