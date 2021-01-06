const express =require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
// const productRoutes =require('./api/routes/product');
//helmetjs,cookie parser,passport,body-parser,morgan
const validationRoutes=require('./api/routes/validation');
const recoverRoutes=require('./api/routes/email');
const guestRoutes=require('./api/routes/guest')
const userRoutes=require('./api/routes/user');
const reset=require('./public/reset')
const resetRoute=require('./api/routes/reset')

var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
//     if(req.method==='OPTIONS'){
//         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
//         return res.status(200).json({});
//     }
//     next();
// })

// app.use('/product',productRoutes);
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
    // error.status=404
    next(error);
})

app.use((error,req,res,next)=>{
    
      res.status(error.status|| 500);
      res.json({
          error:{
              message:error.message
          }
      })

})

module.exports = app;