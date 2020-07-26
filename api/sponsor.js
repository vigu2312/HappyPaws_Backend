const Sponsor = require('../models/Sponsor');
const User = require('../models/User');
const Pets = require('../models/pet-data');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Get API
exports.sponsorInfo = (req, res) => {
    // Fetch pet information from Mongo based on the passed ID
    const id = req.params.id;
    console.log("ID is " , id)
    Pets.findOne({ _id: id })
        .then(pet => {
            if (pet) {
                console.log("Inside Success")
                return res.status(200).json(pet)
                
            }
            else {
                return res.status(502).json({})
            }
        });

};







// POST API
exports.sponsor = (req, res, next) => {

    console.log("Inside Backend API")
    const { email, cardNumber, cvc, expiry, name, address1, city, postalCode, state } = req.body;
    console.log(req.body)
    console.log(req.body.email)
    // Validations 
    if (!email || !cardNumber || !cvc || !expiry || !name || !address1 || !city || !postalCode || !state) {
        return res.status(400).json({ msg: 'Please enter all the fields' });
    }
    
    // Creating model to store data in MongoDB
    const sponsor = new Sponsor({
        email, cardNumber, cvc, expiry, name, address1, city, postalCode, state
    })
    sponsor.save()
        .then(story => {
            res.status(200).json({
                success: true,
                msg: 'Payment Success'
            })
        }).catch((error) => {
            console.log("Error is ", error)
        })
}





