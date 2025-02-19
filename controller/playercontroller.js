const mongoose =require('mongoose')
const playerModel=require('../Model/playerModel')


// the below code block will handle player creation request
exports.postPlayerinfo=async(req,res,next)=>{
    try{
        const newplayer=await playerModel.create(req.body)
        res.status(200).json({
            status:'success',
            date:Date.now,
            data:{
                newplayer
            }
        })
            }catch(err){
                console.log(err)
                res.status(400).json({
                    status:'fail',
                    message:err.message
                })
            }
        
        
}
// this code block will get all the players in the database
 exports.getallplayer=async(req,res,next)=>{
    try{
        const allplayer=await playerModel.find()
        if(allplayer===null){
            res.status(404).json({
                message:"there is no player registered  in the database"
            })
        }
        res.status(200).json({
            status:"success",
            length:allplayer.length,
            data:{allplayer}
        })
            }catch(err){
                res.status(404).json({
                    message:err.message
                })
            }
}
// the following codebase will get the player info with the specified id in the database
exports.getplayerinfo=async(req,res,next)=>{
    try{
        const reqId=req.params.id
    const playerinfo=await playerModel.findById(reqId)
    if(!playerinfo){
        res.status(404).json({
            message:"can't find player with the inputed id"
        })
    }else{
        res.status(200).json({
          status:'success',
          data:{playerinfo}
        })
    }
    
        }catch(error){
            res.status(404).json({
                message:error.message
            }) 
        }
}
