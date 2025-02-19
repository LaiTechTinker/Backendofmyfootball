const mongoose= require('mongoose')
const playerModel= new mongoose.Schema({
    Name:{type:String, required:true},
    Ratings:{type:Number, default:1.0,required:true},
    Position :{type:String,required:true},
    Role :{type:String, default:'Nill'},
    Age:{type:Number},
    Strength :{type:Number, default:1.0,required:true},
    Accuracy :{type:Number, default:1.0,required:true},
    Speed :{type:Number, default:1.0,required:true}
})
const playerScheme=mongoose.model('playerinfo', playerModel)
module.exports=playerScheme