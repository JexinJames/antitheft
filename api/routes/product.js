const express=require('express');
const router=express.Router();
const mongoose =require('mongoose')
const checkAuth=require('../middleware/check-auth')

const Product=require('../models/product')

const productControllers=require("../controllers/product")

router.get('/',productControllers.product_get);


router.post('/',checkAuth,(req,res,next)=>{
    res.status(200).json({
        message:'handling POST request to /products'
    });
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    product
        .save()
        .then(result=>{
             console.log(result);
         })
         .catch(err=>console.log(err));
});

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.findById(id)
            .exec()
            .then(doc=>{
                console.log(doc)
                res.status(200).json(doc);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({error:err});


            });
           

   
});


router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.remove({_id:id})
            .exec()
            .then(result=>{
                console.log(result)
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({error:err});


            });
           

   
});


router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.update({_id:id},{$set:{name:req.body.name,price:req.body.price}})
            .exec()
            .then(result=>{
                console.log(result)
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({error:err});


            });
           

   
});



module.exports = router;