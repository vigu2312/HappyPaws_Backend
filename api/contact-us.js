/************
 * Author: Ramya Ramathas
 **********/

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const mongoose= require('mongoose');

const Contact= require('../models/Contactus-data');

// post api call for sending the contact us query
exports.contactUs = (req, res, next) => {

    const contact= new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        query_subject: req.body.query_subject,
        concern: req.body.concern,
    });
    contact.save().then(result => {
        res.status(201).json({
            message: "Contact us query sent"
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
            to: contact.email,
            subject: 'Contact Us query submitted successfully : HappyPaws ',
            html: 'Dear ' +contact.name +',<br>We recieved your query and passed it on to our team.<br>You would recieve a response shorlty. <br><br>Thank you, <br>HappyPaws',
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
