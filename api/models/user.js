const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
        required:true
    },
    authentication:{
        type:String,
        required:true
    },
    mobile_number:{
        type:String,
        required:true,
        match:/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
    }
});

module.exports=mongoose.model('User',userSchema);