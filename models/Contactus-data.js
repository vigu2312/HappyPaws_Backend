/************
 * Author: Ramya Ramathas
 **********/

const mongoose= require('mongoose');

//schema
const contactSchema= mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   email: String,
   query_subject: String,
   concern: String,
});
module.exports= contact = mongoose.model('contact',contactSchema);