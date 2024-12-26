const express=require('express')
const usercontroller=require('../controller/usercontoller');
const Router1=express.Router();


//Router for signup
Router1.route('/signup').post(usercontroller.SignUp);
//Router for Login
Router1.route('/Login').post(usercontroller.Login)
// Router1.route('/Login').post()








//for exporting the router
module.exports=Router1