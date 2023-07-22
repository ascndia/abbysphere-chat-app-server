const socketIO = require('socket.io');
const handleMessageEvent = require('./ws_handler/handleMessage');

function setupSocketServer(server) {
  const io = socketIO(server,{
    cors: {
        origin: ['http://localhost:3000']
    }
  });
  

  io.on('connection', (socket) => {
    console.log('A client connected')

    socket.on('join',(roomId) => {
      socket.leaveAll()
      socket.join(roomId)
    })

    socket.on('message',(roomId, data) => {
      handleMessageEvent(io,socket,{roomId, ...data})
      // if(!roomId || !data || !data.message || !data.userid || !data.username) return
      // if(
      //   !mongoose.Types.ObjectId.isValid(roomId) ||
      //   !mongoose.Types.ObjectId.isValid(data.userid)
      // ) return

      // const newMessage = new MessageSchema({
      //   message:data.message,
      //   type:'text',
      //   senderId:data.userid,
      //   roomId:roomId
      // })

      // newMessage.save()
      // .then((message) => {
      //   RoomSchema.findByIdAndUpdate(roomId,{
      //     latestMessage:message.id,
      //     latestMessageTimeStamp: new Date()
      //   })
      //   data.id = message.id
      //   io.to(roomId).emit('message',data)
      // })
      // .catch((err) => {
      //     console.log(err)
      // });
    })

    // Handle Socket.IO events here
    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });


  });
}

module.exports = setupSocketServer;
