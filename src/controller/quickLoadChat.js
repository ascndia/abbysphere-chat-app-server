const mongoose = require('mongoose')
const MessageSchema = require('../models/schemas/MessageSchema')
const RoomSchema = require('../models/schemas/RoomSchema')
const UserSchema = require('../models/schemas/UserSchema')

const quickGetChat = async (req,res) => {
    const { userid } = req.body
    const {roomId} = req.params
    if(!roomId || !userid) return res.json({msg: 'invalid request'})
    if(
        !mongoose.Types.ObjectId.isValid(userid) ||
        !mongoose.Types.ObjectId.isValid(roomId)
    ) return res.json({msg:'invalid id'})

    const room = await RoomSchema.findById(roomId).catch(err=>res.json({msg:'error finding room'}))
    if(!room) return res.json({msg:'error getting room'})
    if(!room.users.includes(userid)) return res.json({msg:'unauthorized',detail:'unauthorized'})

    const responseData = []

    MessageSchema.find({
        roomId: roomId,
        deleted:false
    })
    .then(async data => {
        if(data.length === 0) return res.json({msg:'no msg yet'})
        for(const message of data){
            try {

                let sender = await UserSchema.findById(message.senderId).then((user)=>{
                return {username:user.username, id:user.id}
                }).catch(()=>null)

                let isYou;
                if(sender.id === userid){
                   isYou = true 
                } else {
                   isYou = false 
                }

                responseData.push({
                    id:message._id,
                    message: message.message,
                    type: message.type,
                    isYou:isYou,
                    sender: sender.username,
                    postedAt: message.postedAt
                })
            
            } catch (error) {
                console.error(error);
                transformedData.push(null);
            }
        }
        return res.json({
            msg:'success',
            detail:'success',
            isGroupChat:room.isGroupChat,
            data:responseData
        })
    })
    .catch(err => {
        return res.json({msg:'error executing queries'})
    })

}

module.exports = quickGetChat