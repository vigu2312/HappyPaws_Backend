/************
 * Author: Vigneshwari Ravichandran
 **********/

const Adopt = require('../models/Adopt');
const Pets= require('../models/pet-data');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


    //fetch the pet information from the database based on id and send it to frontend
    exports.petInfoAdopt = (req,res) => {
        const id= req.params.id;
        Pets.findOne({ _id:id })
        .then(pet => {
            if(pet)
            return res.status(200).json(pet)
            
            else return res.status(502).json({})
        });
        
    };
    
    
//post api call
    
    exports.AdoptRegister = (req, res, next) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;

        const adopt=new Adopt({
            _id:new mongoose.Types.ObjectId(),
            email:req.body.email,
            userAnswer:req.body.userAnswer,
            adoptDate:req.body.adoptDate,
            petName:req.body.petName
        });

        adopt.save().then(result=>{
            res.status(201).json({
                message:"Adoption Appointmet Made"
            });
        }).catch(err=>console.log(err));
    
      
    try{    
      

    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:589,
        secure: false,
        auth: {
          user: 'happypaws5709@gmail.com',
          pass: 'Webgroup6'
        }
      }))
      
      var mailOptions = {
        from: 'happypaws5709@gmail.com',
        to: adopt.email,
        subject: 'Adoption Appointment Confirmation : HappyPaws ',
        html: 'Dear User, <br> Your adoption appointment request for the pet'+adopt.petName+' has been successfully scheduled on '+adopt.adoptDate+'.<br>Please visit us at 1003 Dresden Row, Halifax NS B3J 2K9. We are eager to meet with you.<br>With Regards,<br>HappyPaws Team<br>',
      
      };
      
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        transporter.close();
      });
    }
    catch(err){
        res.json({message:err});
    }
   
    };
    
