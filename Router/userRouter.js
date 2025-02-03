const express=require('express')
const usercontroller=require('../controller/usercontoller');
const Router1=express.Router();


//Router for signup
Router1.route('/signup').post(usercontroller.SignUp);
//Router for Login
Router1.route('/Login').post(usercontroller.Login)
// Router1.route('/Login').post()
// Router for handling forgot password
Router1.route('/forgotpassword').post(usercontroller.forgotpassword)
// router for handling resetpassword
Router1.route('/resetpassword/:token').patch(usercontroller.resetpassword)
// this route is for getting all the users in  the database
Router1.route('/getallusers').get(usercontroller.getallusers) 








//for exporting the router
module.exports=Router1