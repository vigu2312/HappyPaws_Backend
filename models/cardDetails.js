/************
 * Author: Bhagyashree Pandit
 **********/

const mongoose= require('mongoose');

//schema
const cardSchema= mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   cardHolderName: String,
   cardNumber: String,
   cvv: String,
   expiryMonth: String,
   expiryYear: String
},{ collection: 'cardDetails' });
module.exports= card = mongoose.model('cardDetails',cardSchema);