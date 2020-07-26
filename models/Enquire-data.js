/************
 * Author: Ramya Ramathas
 **********/

 const mongoose= require('mongoose');

 //schema
const enquirySchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: String,
    lname: String,
    email: String,
    number: Number,
    country: String,
    postal:String,
    enquiry: String,
});
module.exports= enquiry = mongoose.model('enquiry',enquirySchema);