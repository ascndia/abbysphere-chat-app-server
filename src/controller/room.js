const e = require('cors');
const RoomSchema = require('../models/schemas/RoomSchema')

const getAllRoom = async (req,res) => {

    const { userid } = req.body;
    if(!userid) return res.json({msg:'invalid request'})

    RoomSchema.find({
        deleted:false,
        users:{
            $all:[
                userid
            ]
        }
    }).then((data) => {
        if(!data) return res.json({msg:'error finding'})
        if(data.length === 0) return res.json({msg:'rooms not found'})

        data = data.map(element => {
            if(!element.isGroupChat) return {
                isGroupChat:element.isGroupChat,
                _id: element._id,
                users: element.users,
                createdAt: element.createdAt
            }
            else return {
                isGroupChat:element.isGroupChat,
                _id: element._id,
                roomName: element.roomName,
                roomInfo: element.roomInfo,
                users: element.users,
                users_count: element.users.length,
                admins: element.admins,
                createdAt: element.createdAt
            }
        });

        return res.json({
            msg:`success`,
            roomCount:data.length,
            data:data
        })

    }).catch(err => {
        console.log(err)
        return res.json({msg: 'error finding'})
    })
}

module.exports = getAllRoom