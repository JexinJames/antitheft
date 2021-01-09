const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const validationRoutes=require('./api/routes/validation');
const recoverRoutes=require('./api/routes/email');
const guestRoutes=require('./api/routes/guest')
const userRoutes=require('./api/routes/user');
const reset=require('./public/reset')
const resetRoute=require('./api/routes/reset')


var path = require('path');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




app.use('/validation',validationRoutes);
app.use('/recover',recoverRoutes);
app.use('/guest',guestRoutes);
app.use('/user',userRoutes);
app.use('/page',reset);
app.use('/reset',resetRoute);

app.set('views', path.join(__dirname, '/public/src'))
app.set('view engine', 'ejs')


mongoose.connect(

    process.env.MONGO_URI,
     { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
    
  );




//error handling
app.use((req,res,next)=>{
    const error= new Error('Not found');
    error.status(404);
    next(error);
})

app.use((error,req,res,next)=>{
    
 
    res.render('error.ejs', {
        status:404,
        message:"Page not found",
        info:""
    })


})

module.exports = app;