/************
 * Author: Devam Shah
 **********/

const mongoose = require('mongoose');
const PetCare = require('../models/petCare');

//api to sample 3 random pet types
exports.petCare = (req, res) => {
  


    SelectedPets = {}
    PetCare.aggregate([{ $sample: { size: 3 } }]).then((randomPet) => {
        
        return res.status(200).json(randomPet)
    })
    


  

};