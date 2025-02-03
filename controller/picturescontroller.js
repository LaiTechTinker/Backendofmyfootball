const fs=require('fs')
const path=require('path')
const mongoose= require('mongoose')
const picschema=require('../Model/pictureschema')
const multer=require('multer');


const storage=multer.diskStorage({
    destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, '../imagestore'); // ✅ Ensures correct relative path
            
            // Create directory if it doesn't exist
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true }); // ✅ Creates the folder if missing
            }
    
            cb(null, uploadPath);
        },
        filename:(req,file,cb)=>{
            cb(null,`${Date.now()}--${file.originalname}`);
        },
})
 exports.uploadpic=multer({storage})
// this block code handles posting of pictures
exports.postpic=async(req,res,next)=>{
    try{
const {title,description}=req.body
if(!req.file){
    res.status(200).json({
        status:"fail",
        message:"picture file is needed"
    })
}
// this code block will save the newly created picture
const realpic=new picschema({
    title,
    description,
    picPath:req.file.path

})
await realpic.save()
console.log(req.file)
res.status(200).json({
    status:'success',
    message:'picture file uploaded successfully'
})
    }catch(err){
        res.status(404).json({
  status:'fail',
  message:err.message
        })
    }
}
// this code block will get all the pictures in our database
exports.getallpic=async(req,res,next)=>{
    try{
    const all_pictures= await picschema.find()
    if(all_pictures===null){
        res.status(400).json({
            message:'there is no picture in database'
        })

    }
    res.status(200).json({
        status:'success',
        length:all_pictures.length, 
        data:{all_pictures}
    })
    }catch(err){
res.status(404).json({
    status:'fail',
    message:err.message
})
    }
}
