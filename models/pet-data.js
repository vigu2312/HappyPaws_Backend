/**
 * @author: Bhagyashree
 */ 

const mongoose= require('mongoose');

// Data model for storing Pets
const petSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    type: String,
    breed: String,
    image:String,
    gender: String,
    location:Number,
    color : String
});
module.exports= pets = mongoose.model('pets',petSchema);