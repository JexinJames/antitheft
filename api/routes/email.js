const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const User=require('../models/user');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });



router.post('/',(req,res,next)=>{

const data=req.body.email!=''?{email:req.body.email}:{mobile_number:req.body.mobile_number};

    User.find(data)
        .exec()
        .then(user=>{
            if(user.length<1){
                return res.status(401).json({
                    message:"User dont exist"
                });

            }


            const token=jwt.sign({
              _id:user[0]._id
          },
          process.env.JWT_KEY,
          {
             expiresIn:"15m"
          });



                var mailOptions = {
                    from: process.env.EMAIL,
                    to:user[0].email,
                    subject: 'Recover password',
                    text:'Hi '+user[0].username+'\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'https://jexinjames-antitheft-3463.zeet.app/page/password/'+ user[0]._id +'?token='+token+ '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\nNote:The above link expires after 15 minutes\n\n\n'+
                    'Thank you'
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                      res.status(500).json({
                         error:error
                      })
                    } 
                
        
                      res.status(200).json({
                          message:"email send successfully!!!",
                          info:user[0].email
                      })
                   
                  });
     })



        

});



router.post('/auth',(req,res,next)=>{

  const data=req.body.email!=''?{email:req.body.email}:{mobile_number:req.body.mobile_number};
  
      User.find(data)
          .exec()
          .then(user=>{
              if(user.length<1){
                  return res.status(401).json({
                      message:"User dont exist"
                  });
  
              }


              const token=jwt.sign({
                _id:user[0]._id
            },
            process.env.JWT_KEY,
            {
               expiresIn:"15m"
            });





                  var mailOptions = {
                      from: process.env.EMAIL,
                      to:user[0].email,
                      subject: 'Reset authentication key',
                      text:'Hi '+user[0].username+'\n\nYou are receiving this because you have requested to change authentication key.\n\n' +
                      'Please click on the following link, or paste this into your browser to complete the process:\n' +
                      'https://jexinjames-antitheft-3463.zeet.app/page/authentication/'+ user[0]._id +'?token='+token+ '\n' +'Note:The above link expires after 15 minutes\n\n\n'+
                      'Thank you'
                    };
  
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                        res.status(500).json({
                           error:error
                        })
                      } 
                      
          
                        res.status(200).json({
                            message:"email send successfully!!!",
                            info:user[0].email
                        })
                
                    });
       })
  
  
  
          
  
  });

  router.post('/pass',(req,res,next)=>{

    const data=req.body.email!=''?{email:req.body.email}:{mobile_number:req.body.mobile_number};
    
        User.find(data)
            .exec()
            .then(user=>{
                if(user.length<1){
                    return res.status(401).json({
                        message:"User dont exist"
                    });
    
                }


                const token=jwt.sign({
                  _id:user[0]._id
              },
              process.env.JWT_KEY,
              {
                 expiresIn:"15m"
              });
  

                    var mailOptions = {
                        from: process.env.EMAIL,
                        to:user[0].email,
                        subject: 'Reset password',
                        text:'Hi '+user[0].username+'\n\nYou are receiving this because you have requested to change password.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'https://jexinjames-antitheft-3463.zeet.app/page/password/'+ user[0]._id +'?token='+token+ '\n' +'Note:The above link expires after 15 minutes\n\n\n'+
                        'Thank you'
                      };
    
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                          res.status(500).json({
                             error:error
                          })
                        } 
                        
            
                          res.status(200).json({
                              message:"email send successfully!!!",
                              info:user[0].email
                          })
                  
                      });
         })
    
    
    
            
    
    });
  


module.exports = router;