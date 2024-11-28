const express=require('express')
const usercontroller=require('../controller/usercontoller');
const Router1=express.Router();



Router1.route('/signup').post(usercontroller.SignUp);
// Router1.route('/Login').post()








//for exporting the router
module.exports=Router1