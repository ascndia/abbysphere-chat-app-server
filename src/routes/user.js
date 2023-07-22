const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('../utils/authenticatejwt')
const searchUser = require('../controller/finduser')
const {initChat, initGroup} = require('../controller/user_relation')
const getUserInfo = require('../controller/getUserInfo')

router.use(jwtAuthMiddleware)

router.route('/user/:keyword')
.get(searchUser)

router.route('/info')
.get(getUserInfo)

router.route('/chatinit')
.post(initChat)

router.route('/groupinit')
.post(initGroup)

module.exports = router