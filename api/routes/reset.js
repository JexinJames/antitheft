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
        res.status(409).json({
            error:"password and confirm password dont match"
        })
    }
    else{

        if(!password.match(/^.{5,10}$/)){
            return res.status(409).json({
                message:"Password length should be 5-10"
            })
        }
        else{

            bcrypt.hash(password,10,(err,hash)=>{

                User.update({_id:_id},{$set:{password:hash}})
                .exec()
                .then(result=>{
                    res.status(200).json({message:"Password successfully updated"});
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({error:err});
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
        res.status(409).json({
            error:"authentication and confirm authentication dont match"
        })
    }
    else{

        if(!authentication.match(/^.{5,10}$/)){
            return res.status(409).json({
                message:"authentication length should be 5-10"
            })
        }
        else{

            // bcrypt.hash(password,10,(err,hash)=>{

                User.update({_id:_id},{$set:{authentication:authentication}})
                .exec()
                .then(result=>{
                    res.status(200).json({message:"Authentication key successfully updated"});
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({error:err});
                })

            // })


        }
    }
})


module.exports = router;