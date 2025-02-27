const fs =require('fs')
const path=require('path')
const videoModel =require('../Model/videoschema')
const multer= require('multer')
const mongoose=require('mongoose')
// this code block will configure multer file storage
const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../videostore'); // ✅ Ensures correct relative path
        
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
// the code below will configure muter
exports.upload=multer({storage})

exports.postvid=async(req,res,next)=>{
    try{
      
   const {title,description}=req.body
   if(!req.file){
    res.status(404).json({
        status:"fail",
        message:"video file is required"
    })
   }
   const realvid=  new videoModel({
title,
description,
videoPath:req.file.path,
   });
   await realvid.save();
   console.log(req.file)
   res.status(200).json({
    message:"video uploaded"
   })
    }catch(err){
res.status(404).json({
    status:"fail",
    message:err.message
})
    }
}
// this code block will get all videos from the database
exports.getallvid=async(req,res,next)=>{

    try{
       
    const allmovies=await videoModel.find()
   
  if(allmovies===null){
            res.status(404).json({
                status:'null',
                message:'there is no movie stored in database'
            })
        }
        res.status(200).json({
            status:'success',
            length:allmovies.length,
            movies:allmovies

        }
    )
    }catch(err){
res.status(404).json({
    status:"fail",
    message:err.message
})
    }


}
// the following code block will delete a video from the database
exports.deletevid=async(req,res,next)=>{
    try{
    const reqId=req.params.id
    const vidfordelete=await videoModel.findByIdAndDelete(reqId)
    if(!vidfordelete){
       return res.status(404).json({
            message:"can't find vid with this id in db"
        })
    }else{



    res.status(200).json({
        message:`the video with the ${reqId} has been deleted`
    })
    }

    }catch(error){
        res.status(404).json({
            message:error.message
        }) 
    }
}