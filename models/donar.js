/************
 * Author: Bhagyashree Pandit
 **********/

const mongoose= require('mongoose');

//schema
const donarSchema= mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   email: String,
   amount: Number,
   reason: String,
   onetime: Boolean
});
module.exports= donar = mongoose.model('donars',donarSchema);