const express = require('express')
const router = express.Router()
const registerHandler = require('../controller/registerhandler');
const handleLogin = require('../controller/loginhandler');

router.route('/register')
.post(registerHandler)

router.route('/login')
.post(handleLogin)

module.exports = router 