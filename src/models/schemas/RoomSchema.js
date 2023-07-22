const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
    isGroupChat:{
        type: Boolean,
    },
    roomName:{
        type: String,
        default: ""
    },
    deleted:{
        type: Boolean,
        default: false
    },
    roomInfo:{
        type: String,
        default: ""
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    admins:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    adminsOnly:{
        type: Boolean,
        default: false
    },
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    latestMessageTimeStamp:{
        type:Date
    },
    roomPictures:{
        type:String
    }
})

module.exports = mongoose.model('Room',RoomSchema)