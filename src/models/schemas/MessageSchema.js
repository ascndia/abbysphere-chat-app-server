const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    message:{
        type: String
    },
    type:{
        type: String
    },
    replying:{
        type: Boolean,
        default:false
    },
    replyingTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Message'
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    deleted:{
        type: Boolean,
        default: false
    },
    postedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message',MessageSchema)