const express =require('express')
const app=express()
app.use(express.json());
// app.use(express.static)

const userRouter = require('../Router/userRouter')
const VideoRoute=  require('../Router/VideoRouter')



app.use('/api/v1/users',userRouter);
app.use('/api/v1/Videos',VideoRoute)
// app.use('/api/')
module.exports=app