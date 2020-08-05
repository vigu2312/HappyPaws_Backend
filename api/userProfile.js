/************
 * Author: Devam Shah
 **********/
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//post api to update user info
exports.aboutMe = (req, res, next) => {
    const data = req.body
    console.log(data)
    const userProfile = new UserProfile({
        _id: data.userId,
        email: data.email,
        lastName: data.lastName,
        contactNumber: data.contactNumber,
        country: data.country,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode
    })

    UserProfile.findOne({ _id: data.userId }).then((doc) => {
        if (doc) {
            var newvalues = {
                $set: {
                    lastName: data.lastName, contactNumber: data.contactNumber, country: data.country, address1: data.address1,
                    address2: data.address2, city: data.city, province: data.province, postalCode: data.postalCode
                }
            }
            UserProfile.updateOne({ email: doc.email }, newvalues, (error, result) => {
                if (error) {
                    return res.status(400).json({ message: 'Data Could not be updated' })
                }
                else {
                    return res.status(200).json({ message: 'Your Data is successfully updated' })
                }
            })
        } else {
            userProfile.save().then((profile) => {
                return res.status(200).json({ data: profile, message: 'Your Data is Saved' })
            }).catch((error) => {
                console.log("Here", error)
                return res.status(400).json({ message: 'We Could not save your data' })
            })
        }
    }).catch((error) => {
        console.log("Error is ", error)
    })
   

}

//get api to fetch stored user info
exports.fetchAboutMe = (req, res, next) => {
    console.log("inside GET")
    console.log(req.query.userId)
    userId = req.query.userId

    UserProfile.findOne({ _id: userId }).then((user) => {
        console.log(user)
        return res.status(200).json({ user: user })
    }).catch((error) => {

    })

}



exports.accountSettings = (req, res) => {
    console.log(req.body)
}


//api to update password
exports.accountSettings = (req, res) => {
    console.log(req.body)
    const userId = req.body.userID
    const oldPass = req.body.password
    var newPass = req.body.newPass

    User.findOne({ _id: userId }).then((user) => {
        if (user) {
            bcrypt.compare(oldPass, user.password).then((isMatch) => {
                if (!isMatch) return res.status(200).json({ message: 'Your Old Password is incorrect', type: 'error' })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPass, salt, (err, hash) => {
                        if (err) throw err;
                        newPass = hash
                        var newvalues = {
                            $set: {
                                password: newPass
                            }
                        }
                        User.updateOne({ _id: userId }, newvalues, (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                return res.status(200).json({ message: 'Your Password is changed successfully', type: 'success' })
                            }
                        })
                    })
                })
            })
        }
    }).catch((error) => {

    })
};
