const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('../utils/authenticatejwt')
const getAllRoom = require('../controller/room')
const quickGetRoom = require('../controller/quickLoadRoom')

router.use(jwtAuthMiddleware)

router.route('/room')
.get(getAllRoom)

router.route('/qroom')
.get(quickGetRoom)

module.exports = router