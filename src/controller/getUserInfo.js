const getUserInfo = (req,res) => {
    const { userid, email, username } = req.body
    if(!username || !userid || !email ) return res.json({msg:'invalid request'})
    return res.json({
        msg:'success',
        detail:'success',
        data:{
            userid,
            username,
            email
        }
    })
}
module.exports = getUserInfo