const express= require('express');
const router=express.Router();
const mongoose= require('mongoose');

const Pets= require('../models/pet-data');

// fetch the pet information from the database and send it to frontend
router.get('/', (req,res,next) => {
    Pets.find().then(pet => {
        if (pet) return res.status(200).json(pet)
        else return res.status(502).json({})
    });
});

// fetch the specific pets by name, breed, type or color 
router.get('/:keyword', (req,res,next) => {
    const keyword= req.params.keyword;
    Pets.find({$or: [ {"name":keyword}, {"breed":keyword}, {"type":keyword}, {"color":keyword}]}).then(pet => {
        if (pet) return res.status(200).json(pet)
        else return res.status(502).json({})
    });
});

// add a new pet to the database
router.post('/', (req,res,next) => {
    const pet= new Pets({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        type: req.body.type,
        breed: req.body.breed,
        image: req.body.image,
        gender: req.body.gender,
        location: req.body.location,
        color: req.body.color,
    });
    pet.save().then(result => {
        res.status(201).json({
            message: "pet added"
        });
    }).catch(err => console.log(err));
    
});

module.exports=router;