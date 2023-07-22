const UserSchema = require('../models/schemas/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.json({msg: 'invalid request', detail:'invalid request'})
    let user = await UserSchema.find({email: email})
    user = user[0]
    if(!user) return res.json({msg:'user not exist',detail:'user not exist'})

    bcrypt.compare(password, user.password,(err, result) => {
        if(err) return res.json({msg: 'error at bcrypt compare'})
        else if(result) {
            const token = jwt.sign({
                userid : user._id,
                username: user.username,
                email: user.email
            },process.env.secretkey)

            res.json({
                msg:`success logged in to ${user.username}`,
                token:token
            })
        }
        else res.json({msg:'wrong password', detail:'wrong password'})

    })
}

module.exports = handleLogin