const express=require('express');
const router=express.Router();
var path = require('path');
const checkauth=require('../api/middleware/check-auth');






router.get('/password/:_id',checkauth,(req, res)=>{ 
  
    res.render('resetpass.ejs', { 
        _id:req.params._id
    }) 
}) 
router.get('/authentication/:_id',checkauth,(req, res)=>{ 
  
    res.render('resetauth.ejs', { 
        _id:req.params._id
    }) 
}) 


module.exports = router;