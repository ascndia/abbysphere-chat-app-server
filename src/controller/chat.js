const mongoose = require('mongoose')
const MessageSchema = require('../models/schemas/MessageSchema')
const RoomSchema = require('../models/schemas/RoomSchema')
const UserSchema = require('../models/schemas/UserSchema')

const getChat = async (req, res) => {
    const { userid } = req.body
    const {roomId} = req.params
    if(!roomId || !userid) return res.json({msg: 'invalid request'})
    if(
        !mongoose.Types.ObjectId.isValid(userid) ||
        !mongoose.Types.ObjectId.isValid(roomId)
    ) return res.json({msg:'invalid id'})

    // check if user is authorized
    const room = await RoomSchema.findById(roomId).catch(err=>res.json({msg:'error finding room'}))
    if(!room) return res.json({msg:'error getting room'})
    if(!room.users.includes(userid)) return res.json({msg:'unauthorized'})
    
    const realdata = []

    MessageSchema.find({
        roomId: roomId,
        deleted:false
    })
    .then(async data => {
        if(data.length === 0) return res.json({msg:'no msg yet'})
        for(const e of data){
            try {
                let sender = await UserSchema.findById(e.senderId).then((user)=>{
                return user.username
                    
                }).catch(()=>null)

                console.log(sender)

                realdata.push({
                    message: e.message,
                    type: e.type,
                    replying: e.replying,
                    replyingTo: e.replyingTo,
                    senderId: e.senderId,
                    sender: sender,
                    roomId : e.roomId,
                    postedAt: e.postedAt
                })
            
            } catch (error) {
                console.error(error);
                transformedData.push(null);
            }
        }
        return res.json({
            msg:'success',
            count:realdata.length,
            data:realdata
        })
    })
    .catch(err => {
        return res.json({msg:'error executing queries'})
    })
}

const sendRegulerChat = async (req, res) => {

    const { message, userid, roomId } = req.body
    if(!message || !roomId || !userid) return res.json({msg:'invalid request'})
    if(
        !mongoose.Types.ObjectId.isValid(userid) ||
        !mongoose.Types.ObjectId.isValid(roomId)
    ) return res.json({msg:'invalid id'})

    if(typeof(message) !== 'string') return res.json({msg:'invalid types'})
    
    // check if user is authorized
    const room = await RoomSchema.findById(roomId).catch(err=>res.json({msg:'error finding room'}))
    if(!room) return res.json({msg:'error getting room'})

    if(!room.users.includes(userid)) return res.json({msg:'unauthorized'})

    if(room.isGroupChat) {
        // handle if it is groupchat and if only admins can send message
        if(room.adminsOnly){
            if(!room.admins.includes(userid)) return res.json({
                msg:'unauthorized'
            })
        }
    }

    const Message = new MessageSchema({
        message: message,
        type:'text',
        senderId:userid,
        roomId:roomId
    })

    Message.save()
    .then(()=>{
        return res.json({
            msg:`succesfully send`
        })
    })
    .catch((err) => {
        console.log(err)
        return res.json({msg:'error'})
    });
}

module.exports = {
    sendRegulerChat,
    getChat
}