const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const mongoose= require('mongoose');

const Enquiry= require('../models/Enquire-data');
const Pets= require('../models/pet-data');

//fetch the pet information from the database based on id and send it to frontend
exports.petInfo = (req,res) => {
    const id= req.params.id;
    Pets.findOne({ _id:id })
    .then(pet => {
        if(pet)
        return res.status(200).json(pet)
        
        else return res.status(502).json({})
    });
    
};

// add enquiry 
exports.petEnquire = (req, res, next) => {

    const enquire= new Enquiry({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        number: req.body.number,
        country: req.body.country,
        postal: req.body.postal,
        enquiry: req.body.enquiry,
    });
    enquire.save().then(result => {
        res.status(201).json({
            message: "Enquiry added"
        });
    }).catch(err => console.log(err));

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
            to: enquire.email,
            subject: 'Enquiry submitted successfully : HappyPaws ',
            html: 'Dear ' +enquire.fname +',<br>We recieved your enquiry and passed it on to the respective shelter.<br>You would recieve a response shorlty. <br><br>Thank you, <br>HappyPaws',
            };
          
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent successfully: ' + info.response);
            }
            transporter.close();
          });
        }
        catch(err){
            res.json({message:err});
        }
    
    
};
