const mongoose=require('mongoose')

const deviceSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    devicename:{
        type:String,
        required:true
    },
    battery:{
        type:String,
        required:true,
    },
    network:{
        type:String,
        required:true
    },
    lock:{
        type:Boolean,
        required:true
    },
    alert:{
        type:Boolean,
        required:true
    },
    format:{
        type:Boolean,
        required:true
        
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Device',deviceSchema);