const UserSchema = require('../models/schemas/UserSchema')
const bcrypt = require('bcrypt');


const registerHandler = async (req, res, next) => {

    let { username, email, password, confirmpassword } = req.body
    if(!username || !email || !password || !confirmpassword) return res.json({msg:'invalid request', detail:'invalid request'})
    if(password !== confirmpassword) return res.json({msg:'password does not match', detail:'password not match'})

    const already_exist = await UserSchema.find({email:email})

    if(already_exist.length !== 0) return res.json({msg:"email already in use", detail:'email already exist'})

    await bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.json({msg:'error hashing password'})
        } else {
            const newUser = new UserSchema({
                username:username,
                password:hashedPassword,
                email:email
            })
        
            newUser.save()
            .then(() => res.json({msg:`succesfully created user of name ${username}`,detail:'success'}))
            .catch((err) => {
                console.log(err)
                res.json({msg:'error failed to save new user'})
            });

        }
    });
}

module.exports = registerHandler