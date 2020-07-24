const Volunteer = require('../models/Volunteer');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

    exports.volFn = (req, res, next) => {
        try {
            res.send("Volunteer");
         } catch (err) {
             console.log(err)
         }
      
    };

    
    exports.VolunteerRegister = (req, res, next) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;

        const volunteer=new Volunteer({
            _id:new mongoose.Types.ObjectId(),
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            contactNo:req.body.contactNo,
            eventName:req.body.eventName,
            volunteerRegisterDate:today
        });

        volunteer.save().then(result=>{
            res.status(201).json({
                message:"Volunteer Registered"
            });
        }).catch(err=>console.log(err));

    try{    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
        to: volunteer.email,
        subject: 'Volunteer Registeration Confirmation : HappyPaws ',
        html: 'Dear Customer,<br>Thank you for signing up to volunteer with HappyPaws for the event '+volunteer.eventName+'.<br><br>Your Volunteer Details will be mailed shortly',
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
    
