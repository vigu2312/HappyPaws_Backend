const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const LoggedInUserSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        required: true,
        default: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = LoggedInUser = mongoose.model('LoggedInUser', LoggedInUserSchema);