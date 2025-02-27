const express=require('express')
const usercontroller=require('../controller/usercontoller');
const emailcontroller=require('../controller/EmailAnnouce')
const Router1=express.Router();


//Router for signup
Router1.route('/signup').post(usercontroller.SignUp);
//Router for Login
Router1.route('/Login').post(usercontroller.Login)
// Router1.route('/Login').post()
// Router for handling forgot password
Router1.route('/forgotpassword').post(usercontroller.forgotpassword)
// this route is for sending annoucement to the user
Router1.route('/annoucement').post(emailcontroller.sendMail)
// router for handling resetpassword
Router1.route('/resetpassword/:token').patch(usercontroller.resetpassword)
// this route is for getting all the users in  the database
Router1.route('/getallusers').get(usercontroller.getallusers) 
// this route is for deleting user in the database
Router1.route('/deleteuser/:id').post(usercontroller.deleteuser) 









//for exporting the router
module.exports=Router1