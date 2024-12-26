
const dotenv=require('dotenv')
dotenv.config({path:'./custom.env'})
const mongoose= require('mongoose')
const app= require('./controller/app');
const port=7000;

// console.log(process.env.PORT)
//connecting with Database
mongoose.connect(process.env.DB_CONNECTION_STR).then(()=>{
    console.log('database connection successfull')
}).catch((err)=>{
    console.log(err.message)
})
/// listening to server on port 4000
app.listen(port,()=>{ 
    try{
    console.log(`server has started at port number ${port}`)

    }catch(err){
 console.log(err)
    }
})