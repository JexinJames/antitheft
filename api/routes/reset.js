const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const User=require('../models/user');

router.get('/password/:_id',(req,res,next)=>{
    
    const _id=req.params._id;
    const  password=req.query.password;
    const confirm_password=req.query.confirm_password;
    
    if(password!=confirm_password){

        res.render('error.ejs', {
            status:409,
            message:"Incorrect input",
            info:"Password and confirm password dont match"
        }) 
    }
    else{

        if(!password.match(/^.{5,10}$/)){
           
            res.render('error.ejs', {
                status:409,
                message:"Invalid input",
                info:"Password length should be 5-10"
            }) 
        }
        else{

            bcrypt.hash(password,10,(err,hash)=>{

                User.update({_id:_id},{$set:{password:hash}})
                .exec()
                .then(result=>{
                   
                    res.render('success.ejs', { 
                        message:"Password successfully updated",
                        info:"Please login to your account"
                    }) 
                })
                .catch(err=>{
                    console.log(err);
                    
                    res.render('error.ejs', {
                        status:500,
                        message:"something went wrong",
                        info:"Please try again later"
                    }) 
                })

            })


        }
    }
})




router.get('/auth/:_id',(req,res,next)=>{
    
    const _id=req.params._id;
    const  authentication=req.query.authentication;
    const confirm_authentication=req.query.confirm_authentication;
    
    if(authentication!=confirm_authentication){
       
        res.render('error.ejs', {
            status:409,
            message:"Incorrect input",
            info:"Authentication and confirm authentication dont match"
        }) 
    }
    else{

        if(!authentication.match(/^.{5,10}$/)){
            
            res.render('error.ejs', {
                status:409,
                message:"Invalid input",
                info:"Authentication key length should be 5-10"
            })
        }
        else{

           

                User.update({_id:_id},{$set:{authentication:authentication}})
                .exec()
                .then(result=>{
                  
                    res.render('success.ejs', { 
                        message:"Authentication key successfully updated",
                        info:"Please logout and login to your account"
                    }) 
                })
                .catch(err=>{
                    
                    res.status(500).json({error:err});
                })

            


        }
    }
})


module.exports = router;