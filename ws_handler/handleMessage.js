const MessageSchema = require('../src/models/schemas/MessageSchema');
const RoomSchema = require('../src/models/schemas/RoomSchema');
const mongoose = require('mongoose');

const handleMessageEvent = (io,socket,data) => {
    const {roomId} = data
    if (!roomId || !data.message || !data.userid || !data.username) return;
    if (
        !mongoose.Types.ObjectId.isValid(roomId) ||
        !mongoose.Types.ObjectId.isValid(data.userid)
    ) return;

    const newMessage = new MessageSchema({
        message: data.message,
        type: 'text',
        senderId: data.userid,
        roomId,
    });

    newMessage.save()
      .then((message) => {
        RoomSchema.findByIdAndUpdate(roomId,{
          latestMessage:message.id,
          latestMessageTimeStamp: new Date()
        })
        data.id = message.id
        io.to(roomId).emit('message',data)
      })
      .catch((err) => {
          console.log(err)
      });

}

module.exports = handleMessageEvent