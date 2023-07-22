const RoomSchema = require('../models/schemas/RoomSchema')
const UserSchema = require('../models/schemas/UserSchema')
const mongoose = require('mongoose')

const initChat = async (req,res) => {

    const { userid, targetid } = req.body
    if(!targetid || !userid) return res.json({msg:'invalid request'})
    if(targetid == userid) return res.json({msg:'invalid request'})

    if(!mongoose.Types.ObjectId.isValid(userid)) return res.json({
        msg:'invalid self id'
    })

    if(!mongoose.Types.ObjectId.isValid(targetid)) return res.json({
        msg:'invalid id'
    })
    if(await UserSchema.findById(targetid).length == 0) return res.json({
        msg:'invalid id'
    })

    await RoomSchema.find({
        isGroupChat:false,
        users: {
            $all:[
                userid,
                targetid
            ]
        }
    })
    .then((exist) => {
        if(exist.length != 0) return res.json({msg:'room already exist'})
        else {

            const Room = new RoomSchema({
                isGroupChat: false,
                users:[
                    userid,
                    targetid
                ]
            })
        
            Room.save()
            .then(()=>{
                return res.json({
                    msg:"succesfully initialized chat and saved to database"
                })
            })
            .catch((err) => {
                console.log(err)
                return res.json({msg:'error'})
            });
        
        }
    })
    .catch((err) => {
        console.log(err)
        return res.json({
            msg:'error'
        })
    });
}

const initGroup = async (req,res) => {
    const { groupName, userid } = req.body
    if(!groupName || !userid) return res.json({msg:'invalid request'})
    if(!mongoose.Types.ObjectId.isValid(userid)) return res.json({msg:'invalid request'})

    const Room = new RoomSchema({
        isGroupChat:true,
        roomName:groupName,
        users:[
            userid
        ],
        admins:[
            userid
        ]
    })

    Room.save()
    .then(()=>{
        return res.json({
             msg:`succesfully saved groupchat with name of ${groupName}`
        })
    })
    .catch((err) => {
        console.log(err)
        return res.json({msg:'error'})
    });
}

module.exports = {
    initChat,
    initGroup
}