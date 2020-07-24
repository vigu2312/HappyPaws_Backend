const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const VolunteerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add your First Name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your Last Name']
    },
    email: {
        type: String,
        required: [true, 'Please add your Email ID'],
        unique: true
    },
    contactNo: {
        type: String,
        required: [true, 'Please add your Phone Number']
    },
    eventName: {
        type: String,
        required: [true, 'Please select event']
    },
    volunteerRegisterDate: {
        type: String,
        required:true
    },
});

module.exports = Volunteer = mongoose.model('Volunteer', VolunteerSchema);