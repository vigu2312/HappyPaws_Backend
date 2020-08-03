/************
 * Author: Devam Shah
 **********/

const mongoose = require('mongoose');
const PetCare = require('../models/petCare');


exports.petCare = (req, res) => {
    // Fetch pet information from Mongo based on the passed ID
    // PetCare.find().then(petCare => {
    //     if(petCare) {
    //     console.log(petCare)
    //     }
    // })


    SelectedPets = {}
    PetCare.aggregate([{ $sample: { size: 3 } }]).then((randomPet) => {
        
        return res.status(200).json(randomPet)
    })
    


    // Pets.findOne({ _id: id })
    //     .then(pet => {
    //         if (pet) {
    //             console.log("Inside Success")
    //             return res.status(200).json(pet)

    //         }
    //         else {
    //             return res.status(502).json({})
    //         }
    //     });

};