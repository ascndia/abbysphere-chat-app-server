const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    friendList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    profilePicture:{
        type: String,
        default: 'default_profile_picture.jpg'
    },
    bio:{
        type: String
    }
})

module.exports = mongoose.model('User',UserSchema)