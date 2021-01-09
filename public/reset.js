const express=require('express');
const router=express.Router();
var path = require('path');






router.get('/password/:_id',(req, res)=>{ 
  
    res.render('resetpass.ejs', { 
        _id:req.params._id
    }) 
}) 
router.get('/authentication/:_id',(req, res)=>{ 
  
    res.render('resetauth.ejs', { 
        _id:req.params._id
    }) 
}) 


module.exports = router;