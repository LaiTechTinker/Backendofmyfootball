const videoModel =require('../Model/MoviesModel')
const multer= require('multer')
const path=require('path')

exports.postvid=async(req,res)=>{
try{
   const createvid =videoModel.create(req.body)
   res.status(200).json({
    status:'success',
    date:Date.now(),
    data:createvid
   })
}catch(err){
res.status(400).json({
    status:'fail',
    message:err.message,

})
}
};
exports.getallvid=async(req,res)=>{
    try{
    const allvid= await videoModel.find(req.query);
    res.status(200).json({
        status:'success',
        data:allvid
    })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message,
        
        })
    }
}