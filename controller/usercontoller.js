const userSchema= require('../Model/userModel');

// sigup function creation block

exports.SignUp=async (req,res,next)=>{
    try{
const newuser=await userSchema.create(req.body)
res.status(200).json({
    status:'success',
    date:Date.now,
    data:{
        newuser
    }
})
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
next()

}