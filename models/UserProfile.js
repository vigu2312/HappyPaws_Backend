/************
 * Author: Devam Shah
 **********/

const mongoose= require('mongoose');

//schema
const UserProfileSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: String,  
   lastName: String,
   contactNumber: String,
   country: String,
   address1: String,
   address2: String,
   city: String,
   province: String,
   postalCode: String
});
module.exports= enquiry = mongoose.model('userprofile',UserProfileSchema);