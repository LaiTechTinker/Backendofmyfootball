const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')
const crypto=require('crypto')
const validator=require('validator')
const userModel= new mongoose.Schema({
    email:{
 type:String,
 required:[true,'this field is a required field'],
 validate:[validator.isEmail, 'please provide a valid email'],
 unique:[true, 'this email already existed'],

    },
    Firstname:{
 type:String,
 required:[true,'this field is a required field'],

    },
    Lastname:{
        type:String,
        required:[true,'this field is a required field'],
       
           },
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:8,
        // select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'provide confirm password'],
        validate:{
            validator:function(val){
                return val==this.password
            },
            message:'Confirm password does not match password'
        }
    }, 
    passwordResetToken:{
        type:String
    },
    passwordResetTokenExpires:{type:Date},
    passwordchangedAt:{type:Date}

    

})
userModel.methods.comparePasswordInDb=async(pswd,pswdb)=>{
  return  await bcrypt.compare(pswd,pswdb)
}
userModel.methods.createResetPasswordToken = function(){
    const resetToken=crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExpires=Date.now()+ 10 *60 *1000;
  console.log(resetToken,this.passwordResetToken);
  return resetToken;
}

userModel.pre('save',async function(next){
    if(!this.isModified('password'))return next();
   this.password= await bcrypt.hash(this.password,9);
   this.confirmPassword= undefined; 
   console.log('hello')
   next()
})
const user= mongoose.model('Users',userModel)
module.exports=user