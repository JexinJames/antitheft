const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
    try{
        const token=req.query.token;
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        next();
    }

    catch(error){
        
        res.render('error.ejs', {
            status:401,
            message:"Url expired",
            info:"Please request for url again"
        })
    }
    
    
}