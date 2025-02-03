const mongoose =require('mongoose')
const picSchema=new mongoose.Schema({
    title:{
        type:String
        
    },  
    description:{
        type:String
    },  
    picPath:{
        type:String, 
        required:true
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    }
    
  
  
})
const pictures=mongoose.model('Pictures',picSchema)
module.exports=pictures