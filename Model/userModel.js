const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')
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
        select:false
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
    photo:{
        type:String,
        default:'ibrahim'

    }

})
userModel.pre('save',async function(next){
    if(!this.isModified('password'))return next();
   this.password= await bcrypt.hash(this.password,9);
   this.confirmPassword= undefined;
   next()
})
const user= mongoose.model('Users',userModel)
module.exports=user