const UserSchema = require('../models/schemas/UserSchema')

const searchUser = async (req,res) => {

    const { username } = req.body
    const keyword = req.params.keyword
    if(!keyword || !username ) return res.json({msg:'invalid request',detail:'failed'})

    let users = await UserSchema.find({
        username: new RegExp(keyword, "i")
    })

    if(users.length === 0) return res.json({msg:'no user found',detail:'failed'})
    
    users = users.map((e) => {
        return {
            _id: e._id,
            username: e.username,
            email: e.email,
            friendList: e.friendList,
        }
    }).filter(e => {
        return e._id != req.body.userid
    })

    if(users.length === 0) return res.json({msg:'no user found',detail:'failed'})

    res.json({
        msg:`success fetched ${users.length} users`,
        detail:'success',
        users
    })

}

module.exports = searchUser