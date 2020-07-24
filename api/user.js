const User = require('../models/User');
const LoggedInUser = require('../models/LoggedInUser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// module.exports = (passport, jwt) => {
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
                            { expiresIn: 3600 },
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

exports.login = (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validations 
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }

        User.findOne({ email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist' })

                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        console.log("match", isMatch, password, user.password)
                        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
                        // JWT token
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
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
            })



    } catch (err) {
        console.log(err)
    }
}

exports.userDetails = (req, res, next) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

exports.logout = (req, res, next) => {
    LoggedInUser.findOneAndDelete({ token: req.token }, function (err) {
        if (!err) {
            res.status(200).json({ mssg: "OK", success: true });
        }
        else {
            console.log(err);
        }
    });

    // jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    //     console.log(err);
    //     if (err) res.status(403).json({
    //         success: false
    //     });
    //     else {
    //         req.logout();
    //         res.status(200).json({
    //             success: true
    //         })
    //     }
    // })
}
exports.forgetPassword = (req, res, next) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }
        User.findOne({ _id: req.user.id })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist' })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        const newPassword = hash;

                        User.findOneAndUpdate({ _id: req.user.id }, { $set: { password: newPassword } }, { new: true }, (err, doc) => {
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

            })
    } catch (error) {

    }
}

exports.forgetPasswordMail = (req, res, next) => {
    const { email } = req.body
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
            html: 'Dear Customer,<br> Please navigate to the link to reset your password http://localhost:8080/forgetPassword',
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            transporter.close();
        });
    }
    catch (err) {
        res.json({ message: err });
    }

};

exports.editProfile = (req, res, next) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ msg: 'Please enter all the fields' });
        }
        User.findOne({ _id: req.user.id })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist' })

                User.findOneAndUpdate({ _id: req.user.id }, { $set: { email: email, name: name } }, { new: true }, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    return res.status(200).json({
                        msg: "OK",
                        success: true,
                        user: {
                            name: doc.email,
                            name: doc.name
                        }
                    });
                })
            })
    } catch (error) {

    }
}
    // return exports;
// }
