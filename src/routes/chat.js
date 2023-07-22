const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('../utils/authenticatejwt')
const {sendRegulerChat, getChat} = require('../controller/chat')
const quickGetChat = require('../controller/quickLoadChat')


router.route('/chat/:roomId')
.get(jwtAuthMiddleware,getChat)
.post(jwtAuthMiddleware,sendRegulerChat)

router.route('/qchat/:roomId')
.get(jwtAuthMiddleware,quickGetChat)


module.exports = router