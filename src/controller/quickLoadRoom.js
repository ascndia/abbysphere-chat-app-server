const MessageSchema = require("../models/schemas/MessageSchema");
const RoomSchema = require("../models/schemas/RoomSchema");
const UserSchema = require("../models/schemas/UserSchema");

const quickGetRoom = (req,res) => {

    const { userid } = req.body;
    if(!userid) return res.json({msg:'invalid request'})

    const responseData = []

    RoomSchema.find({
        deleted:false,
        users:{
            $all:[
                userid
            ]
        }
    })
    .then(async data => {
        if(!data) return res.json({msg:'error finding'})
        if(data.length === 0) return res.json({msg:'rooms not found', detail:'no room found'})
        for(const Room of data){

            try {

                let RoomInfo = {} 
                RoomInfo.roomId = Room._id
                if(Room.isGroupChat){
                    RoomInfo.isGroupChat = true
                    RoomInfo.roomName = Room.roomName  
                    RoomInfo.roomImage = Room.roomPictures
                    if(!RoomInfo.roomImage) RoomInfo.roomImage = 'default_group_picture.jpg'
                } else {
                    RoomInfo.isGroupChat = false
                    const opponentId = Room.users.filter(e => !e.equals(userid)).toString()
                    await UserSchema.findById(opponentId).then(opponent => {
                        RoomInfo.roomName = opponent.username
                        RoomInfo.roomImage = opponent.profilePicture
                        if(!RoomInfo.roomImage) RoomInfo.roomImage = 'default_profile_picture.jpg'
                    }).catch(e=>console.log('j'))
                }
                await MessageSchema.findById(Room.latestMessage)
                .then(msg => {
                    if(!msg){
                        RoomInfo.latestMessage = 'Start a conversation'
                        return
                    } 
                    RoomInfo.latestMessage = msg.message
                })
                .catch(err => console.log('h'))
                responseData.push(RoomInfo)
                
            } catch (error) {
                res.json({msg:'error'})
            }
        }

        return res.json({msg:'succes',detail:'success',data:responseData})
    })
    .catch(err => console.log(err))
}

module.exports = quickGetRoom