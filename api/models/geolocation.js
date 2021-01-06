const mongoose=require('mongoose')

const geolocationSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    latitude:{
        type:Number,
        required:true
    },
    latitudeDelta:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    longitudeDelta:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('Geolocation',geolocationSchema);