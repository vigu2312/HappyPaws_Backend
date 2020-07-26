/************
 * Author: Ramya Ramathas
 **********/

const mongoose= require('mongoose');
const Pets= require('../models/pet-data');

// fetch the pet details
exports.profile = (req,res) => {
     const id1= mongoose.Types.ObjectId(req.params.id);
     Pets.findOne({ _id:id1 })
    .then(pet => {
        if(pet)
        return res.status(200).json(pet)
        
        else return res.status(502).json({})
    });
    
};

