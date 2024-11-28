const express =require('express')
const app=express()
app.use(express.json());
// app.use(express.static)

const userRouter = require('../Router/userRouter')


app.use('/api/v1/users',userRouter)
// app.use('/api/')
module.exports=app