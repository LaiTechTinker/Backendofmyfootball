const express=require('express')
const playerRouter=express.Router()
const playerController=require('../controller/playercontroller')
// playerRouter.route('/postPlayer').post()

playerRouter.route('/createplayer').post(playerController.postPlayerinfo)
playerRouter.route('/getallplayer').get(playerController.getallplayer)
playerRouter.route('/getallplayer/:id').get(playerController.getplayerinfo)

module.exports=playerRouter