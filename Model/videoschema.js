const mongoose=require('mongoose')
const vidschema= new mongoose.Schema({
    title: { type: String},
    description: { type: String },
    videoPath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
})

const videomodel=mongoose.model('video', vidschema)
module.exports=videomodel