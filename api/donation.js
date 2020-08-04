const express= require('express');
const router=express.Router();
const mongoose= require('mongoose');
const Card= require('../models/cardDetails');
const Donar= require('../models/donar');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// Payment gateway for donation
router.post('/payment', (req,res,next) => {
    let success= false;
    Card.findOne({"cardNumber":req.body.cardNumber})
    .then(data => {
        if (data) {
            if(data.cardHolderName==req.body.cardHolderName && data.cvv==req.body.cvv && data.expiryYear==req.body.year && data.expiryMonth==req.body.month){
               success=true;
               
            }
            else {
                console.log("error");
                return res.status(200).json({message: "invalid details"})
            }

            if(success){
                console.log("donar");
                const donar= new Donar({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    amount: req.body.amount,
                    reason: req.body.reason,
                });
        
                donar.save().then( result=> {
                    console.log("donar saved");
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
                          
                          var details = {
                            from: 'happypaws5709@gmail.com',
                            to: donar.email,
                            subject: 'Thank you for your donation!',
                            html: 'Dear ' + donar.name+',<br><br>We have successfully received $'+donar.amount+' from you.'+'<br>Your contribution will be used for improving a pet\'s life. We apprecite your efforts.'+
                            '<br><br>Thank you,<br>HappyPaws :)'                         
                          
                          };
                          
                          
                          transporter.sendMail(details, function(error, info){
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
                    res.status(200).json({
                        message: "success"
                    });
                }).catch(err => console.log(err));
                
            }
            else{
                console.log("else");
                return res.status(500).json({message: "failure"})
            }    
           
        }
        else return res.status(200).json({message: "invalid details"});

    }).catch(err => console.log("prob"+err));

    
    
});
module.exports=router;