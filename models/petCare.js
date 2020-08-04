/************
 * Author: Devam Shah 
 **********/

const mongoose = require('mongoose');

//Create Schema
const petCareSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topic: String,
    description: String,
    // fullDescription: String,
    image: String,
});

module.exports = petCare = mongoose.model('petCare', petCareSchema);