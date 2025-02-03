const userScheme= require('../Model/userModel');
const bycrypt= require('bcryptjs')
const jwt =require('jsonwebtoken')
const nodemailer=require('nodemailer')
const crypto=require('crypto') 
const Customerr=require('../Errorfolder/error')
const sendemail=require('./utils/email')


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
    // this code block finds the user with the inputed email
    try{
        const user= await userScheme.findOne({email:req.body.email})
        if(!user){
            res.status(404).json({
                status:'fail',
                message:'we could not find the user with this email'
            })
    }
    // this calls the CreateResetPassword on the user with the requested email
const resettoken=user.createResetPasswordToken()
await user.save({validateBeforeSave:false})
res.status(200).json({
    status:'success',
    data:user.passwordResetToken
})
// the nodmailer function

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com', // Replace with your SMTP host (e.g., 'smtp.gmail.com' for Gmail)
    port: 587, // Replace with the appropriate port (587 for TLS, 465 for SSL, etc.)
    secure: false, // Use true for port 465, false for other ports
    auth: {
      user: 'layiibrahim32@gmail.com', // Replace with your email
      pass: 'huys wbmv ysad vose', // Replace with your email password or app password
    },
  });
   const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resettoken}`;
  
  // Email options
  const mailOptions = {
    from: '"ibrahim" layiibrahim32@gmail.com', // Sender address
    to: user.email, // List of recipients (separate multiple emails with commas)
    subject: 'Hello from Node.js', // Subject line
    text: resetUrl // Plain text body
    
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });

}catch(err){
    res.status(400).json({ 
        status:'fail',
        message:err.message
    })
}
// generate random reset token

}

exports.resetpassword=async(req,res,next)=>{
    try{
        console.log(req.params)
    // const token=crypto.createHash('sha256').update(req.params.token).digest('hex')
    const token=req.params.token
const user= await userScheme.findOne({passwordResetToken:token})
if(!user){
    res.status(404).json({
        status:"fail",
        message:"token is invalid or has expired"
    })
}else if(user){
user.password=req.body.password;
user.confirmPassword=req.body.confirmPassword;
user.passwordResetToken=undefined;
user.passwordResetTokenExpires=undefined;
user.passwordchangedAt=Date.now()
user.save();
// login in the user once the password is changed
const tokener= jwt.sign({email:user.email},process.env.SECRET);
res.status(200).json({
    status:"success",
    data:tokener
    
})}
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
        console.log(err.message)
    }
}
// this is the block code fetches all the users in the database
exports.getallusers=async(req,res,next)=>{
    try{
const allusers=await userScheme.find()
if(allusers.length===null){
    res.status(404).json({
        message:"there is no user in the database"
    })
}
res.status(200).json({
    status:"success",
    length:allusers.length,
    data:{allusers}
})
    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}