const mongoose=require('mongoose')
const videoModel=new mongoose.Schema({
    Title:{
        type:String,
        required:[true,`this ${this.Title} field is a required field`],

    },
    url:{
        type:String,
        required:[true, 'this field is a required field']

    },
    DateCreated:{
        type:Date,
        default:Date.now()
    }
});
const Videoname= mongoose.model('Videos',videoModel)
module.exports = Videoname