const Events = require('../models/Events');
const Volunteer = require('../models/Volunteer');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const PDFDocument = require('pdfkit');
const fs = require('fs');

    exports.volFn = (req, res, next) => {
            Events.find()
            .then(eventList=>{
              if(eventList)
              return res.status(200).json(eventList)
              else return res.status(502).json({})
            });
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
        const doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('Ticket'+volunteer._id+'.pdf'));
        doc.image('api/Logo.png', 260, 15, {width: 100})

        doc.fontSize(20)
        .text("\nVolunteer Ticket Details",{align:'center'})
        .font('Times-Bold')


    
        doc.fontSize(15)
        .font('Times-Roman')
        .text(' \nEmail:' + volunteer.email+'         Ticket ID         : ' + volunteer._id+ '   \nName :' + volunteer.firstName+'                    Booking Date  : '+volunteer.volunteerRegisterDate+'\n\n\n\n')

        doc.fontSize(13)
        .font('Times-Bold')
        .text('You have been registered for the volunteering event '+volunteer.eventName+' at HappyPaws.\n Please use this ticket as confirmation to enter')

      

        

        doc.fontSize(10)
        .font('Times-Bold')
        .text('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nHappyPaws\nhappypaws5709@gmail.com\nwww.happypaws.com/support',{align:'center'})
        doc.end()

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
        to: volunteer.email,
        subject: 'Volunteer Registeration Confirmation : HappyPaws ',
        html: 'Dear ' + volunteer.firstName+' '+volunteer.lastName+',<br>Thank you for signing up to volunteer with HappyPaws for the event '+volunteer.eventName+'.<br><br>Your Volunteer Details will be mailed shortly',
        attachments:[{
          filename: 'Ticket'+volunteer._id+'.pdf',  
          path: 'Ticket'+volunteer._id+'.pdf',                                       
          contentType: 'application/pdf'
      }]
      
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
    
