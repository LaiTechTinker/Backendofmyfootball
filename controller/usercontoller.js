const userScheme= require('../Model/userModel');
const bycrypt= require('bcryptjs')
const jwt =require('jsonwebtoken')
const Customerr=require('../Errorfolder/error')

// sigup function creation block
const jwtsecret= process.env.SECRET
exports.SignUp=async (req,res,next)=>{
    try{
const newuser=await userScheme.create(req.body)
res.status(200).json({
    status:'success',
    date:Date.now,
    data:{
        newuser
    }
})
    }catch(err){
        console.log(err)
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }


}
/// this is the code block for handling Login route
exports.Login=async(req,res,next)=>{
    
try{
    
    const {email,password}=req.body;
    // const password=req.body.password
const olduser= await userScheme.findOne({email});
// console.log(olduser)
if(!olduser){
    return res.status(401).json({
        status:'fail',
        message:'user with this email does not exist'
    })
}
// this code block compare password in the database with the one in the request body
if(await bycrypt.compare(password, olduser.password)){
const token= jwt.sign({email:olduser.email},process.env.SECRET);
if(res.status(200)){
    return res.status(200).json({
        status:'success',
        data:token   
    })
}else{
    return res.status(401).json({
        status:'fail',
        message:'error'   
    }) 
}
}
}catch(err){
    console.log(err)
    res.status(400).json({
        status:'fail',
        message:err.message
    })
}
    // this code block Checks for incorrect user email and also compare password sent and the one in our database

}
// this code block handle forget password function
exports.forgotpassword = async(req,res,next)=>{
    try{
        const user= await userScheme.findOne({email:req.body.email})
        if(!user){
            res.status(404).json({
                status:'fail',
                message:'we could not find the user with this email'
            })
    }
user.createResetPasswordToken()
await user.save({validateBeforeSave:false})
res.status(200).json({
    status:'success',
    data:user.passwordResetToken
})
}catch(err){
    res.status(400).json({
        status:'fail',
        message:err.message
    })
}
// generate random reset token

}

exports.resetpassword=(req,res,next)=>{

}