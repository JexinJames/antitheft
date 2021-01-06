
const Product=require('../models/product')

exports.product_get=(req,res,next)=>{
    res.status(200).json({
        message:'handling GET request to /products'
    });

}

