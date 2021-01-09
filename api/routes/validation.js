const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const User=require('../models/user');
const e = require('express');



router.post('/signup',(req,res,next)=>{

  if(req.body.password!=req.body.confirm_password){

      return res.status(409).json({
          message:"Password dont match"
      })
  }
  else if (req.body.authentication!=req.body.confirm_authentication) {

    return res.status(409).json({
        message:"Authentication code dont match"
    })
      
  }
  else if(!req.body.password.match(/^.{5,10}$/)){
    return res.status(409).json({
        message:"Password length should be 5-10"
    })

  } 
  else if(!req.body.authentication.match(/^.{5,10}$/)){
    return res.status(409).json({
        message:"Authentication code length should be 5-10"
    })

  } 
  else {



    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>0){
            return res.status(409).json({
                message:"user exists.Use different email address"
            })
        }

        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{

                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }
        
                else{
                            const user=new User({
                            _id:new mongoose.Types.ObjectId(),
                            username:req.body.username,
                            email:req.body.email,
                            password:hash,
                            authentication:req.body.authentication,
                            mobile_number:req.body.mobile_number     
            }); 
        
            user.save()
                .then(result=>{
                    
                    const token=jwt.sign({
                        _id:result._id
                    },
                    process.env.JWT_KEY,
                    {
                       expiresIn:"5m"
                    });

                    
                    res.status(201).json({
                        message:'Auth successfull',
                        info:{
                            token:token,
                        _id:result._id,
                        username:result.username,
                        email:result.email,
                        mobile_number:result.mobile_number,
                        authentication:result.authentication
                        }
                    });
                })
                .catch(err=>{
                   
                    res.status(500).json({
                        error:err,
                        message:err.message
                    });
        
                });
        }
            });
        }
    }) 
  


}
    
        
    
})



router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length<1){
                return res.status(401).json({
                    message:"User dont exist"
                });
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"error Auth failed"
                    });
                }
                if(result){

                 const token=jwt.sign({
                        _id:user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                       expiresIn:"5m"
                    });
                    return res.status(200).json({
                        message:"Auth sucessfull",
                        info:{
                            token:token,
                        _id:user[0]._id,
                        username:user[0].username,
                        email:user[0].email,
                        mobile_number:user[0].mobile_number,
                        authentication:user[0].authentication
                        }
                    });
                }

                res.status(401).json({
                    message:"Wrong password"
                })
            })
        })
        .catch(err=>{
            
            res.status(500).json({
                error:err
            });
        });
})



module.exports = router;