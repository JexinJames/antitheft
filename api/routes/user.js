const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const User=require('../models/user');
const Device=require('../models/device');
const Geolocation=require('../models/geolocation');



router.patch('/update/:_id',(req,res,next)=>{
   
    const id = req.params._id;
    

        User.update({_id:id},{$set:req.body})
                    .exec()
                    .then(result=>{
                           
                            res.status(200).json({
                                message:"successfull"
                            });
                        })
                    .catch(err=>{
                            
                            res.status(500).json({error:err});


                });


    // }

});

   
    router.post('/device/:_id',(req,res,next)=>{
        const id = req.params._id;

        const device=new Device({
            _id:id,
            devicename:req.body.devicename,
            battery:req.body.battery,
            network:req.body.network,
            lock:false,
            alert:false,
            format:false,
            time:"not available",
            date:"not available"
        })
        device
            .save()
            .then(result=>{
                res.status(201).json({
                    message:'successfull'
                });
             })
             .catch(err=>
                
                res.status(500).json({
                    error:err,
                    message:err.message
                })
                );
    });
               
    

    
        
                

    
           

   

router.patch('/device/:_id',(req,res,next)=>{
    const id = req.params._id;

    var myDateString = Date();
    var date=myDateString.split(" ");
    // req.body.time=myDateString.split(" ")[4];
    // req.body.date=date[0]+" "+date[1]+" "+date[2];

    const data={
        devicename:req.body.devicename,
        battery:req.body.battery,
        network:req.body.network,
        time:myDateString.split(" ")[4],
        date:date[0]+" "+date[1]+" "+date[2]
    }
    
    Device.update({_id:id},{$set:data})
            .exec()
            .then(result=>{
            
                res.status(200).json(result);
            })
            .catch(err=>{
               
                res.status(500).json({error:err});


            });
           

   
});




router.post('/geolocation/:_id',(req,res,next)=>{
    const id = req.params._id;

    const geolocation=new Geolocation({
        _id:id,
        latitude:req.body.latitude,
        latitudeDelta:req.body.latitudeDelta,
        longitude:req.body.longitude,
        longitudeDelta:req.body.longitudeDelta
    })
    geolocation
        .save()
        .then(result=>{
            res.status(201).json({
                message:'successfull'
            });
         })
         .catch(err=>
            res.status(500).json({
                error:err,
                message:err.message
            })
            );
});
           




router.patch('/geolocation/:_id',(req,res,next)=>{
    const id = req.params._id;
    
    Geolocation.update({_id:id},{$set:req.body})
            .exec()
            .then(result=>{
                
                res.status(200).json(result);
            })
            .catch(err=>{
                
                res.status(500).json({error:err});


            });
           

   
});







module.exports = router;