const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const User=require('../models/user');
const Device=require('../models/device');
const Geolocation=require('../models/geolocation');


router.get('/device/:_id',(req,res,next)=>{
    const id = req.params._id;
    Device.findById(id)
            .exec()
            .then(doc=>{
                
                res.status(200).json(doc);
            })
            .catch(err=>{
                res.status(500).json({error:err});


            });
           

   
});



router.get('/geolocation/:_id',(req,res,next)=>{
    const id = req.params._id;
    Geolocation.findById(id)
            .exec()
            .then(doc=>{
                res.status(200).json(doc);
            })
            .catch(err=>{
                res.status(500).json({error:err});


            });
           

   
});



module.exports = router;