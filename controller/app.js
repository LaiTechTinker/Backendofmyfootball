const express =require('express')
const app=express()
app.use(express.json());
const cors=require('cors')
// app.use(express.static())

const userRouter = require('../Router/userRouter')
const VideoRoute= require('../Router/VideoRouter')
const playerRouter=require('../Router/playerRouter')

app.use(cors({
  origin: "*", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]

}))
app.use('/api/v1/users',userRouter);
app.use('/api/v1/videos',VideoRoute)
app.use('/api/v1/players',playerRouter)

// app.use('api/v1/pictures',)
// app.use('/api/')
module.exports=app