const express =require('express')
const app=express()
app.use(express.json());
// app.use(express.static())

const userRouter = require('../Router/userRouter')
const VideoRoute= require('../Router/VideoRouter')
const playerRouter=require('../Router/playerRouter')


app.use('/api/v1/users',userRouter);
app.use('/api/v1/videos',VideoRoute)
app.use('/api/v1/players',playerRouter)

// app.use('api/v1/pictures',)
// app.use('/api/')
module.exports=app