/************
 * Author: Devam Shah 
 **********/

const mongoose = require('mongoose');

//Create Schema
const SponsorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add your email'],
    },
    cardNumber: {
        type: String,
        required: [true, 'Please enter a card number'],
    },
    expiry: {
        type: String,
        required: [true, 'Please enter expiry date'],
    },
    cvc: {
        type: String,
        required: [true, 'Please enter cvc'],
    },
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    address1: {
        type: String,
        required: [true, 'Please add your address']
    },
    city: {
        type: String,
        required: [true, 'Please add your city']
    },
    postalCode: {
        type: String,
        required: [true, 'Please add your postal code']
    },
    state: {
        type: String,
        required: [true, 'Please add your state']
    },
});

module.exports = Sponsor = mongoose.model('Sponsor', SponsorSchema);