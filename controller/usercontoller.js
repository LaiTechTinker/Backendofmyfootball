const userSchema= require('../Model/userModel');
const bycrypt= require('bcryptjs')
const jwt =require('jsonwebtoken')
const Customerr=require('../Errorfolder/error')

// sigup function creation block
const jwtsecret= process.env.SECRET
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
const olduser= await userSchema.findOne({email});
// console.log(olduser)
if(!olduser){
    return res.status(401).json({
        status:'fail',
        message:'user with this email does not exist'
    })
}
if(await bycrypt.compare(password, olduser.password)){
const token= jwt.sign({email:olduser.email},process.env.SECRET);
if(res.status(200)){
    return res.status(200).json({
        status:'succes',
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