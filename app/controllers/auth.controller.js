const db = require("../models")
const User = db.user
const Role = db.role
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.AddUser = (req, res) =>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save((err, user) => {
        if(err){
            res.status(500).json({
                success: false,
                message: err
            })
            return
        }
        if(req.body.roles){
            Role.find({
                name: {$in: req.body.roles}
            }, 
            (err, roles)=>{
                if(err){
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                user.roles = roles.map(role => role._id)
                user.save(err => {
                    if(err){
                        res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: "User Added sucessfully"
                    })
                })
            })
        }else{
            Role.findOne({name: "user"}, (err, role) => {
                if(err){
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return
                }
                user.roles = [role._id]
                user.save(err => {
                    if(err){
                        res.status(500).json({
                            success: false,
                            message: err
                        })
                        return
                    }
                })
            })
        }
    })
}

exports.Login = (req,res,next) =>{

    User.findOne({
        username: req.body.username
    }).populate("roles", "-__v")
    .exec((err, user) => {
        if(err){
            res.status(500).json({
                success: false,
                message: err
            })
        }
        if(!user){
            return res.status(404).json({success: false, message: "User Not Found"})
        }

        const validPassword = bcrypt.compareSync(
            req.bod.password, 
            user.password
        )

        if(!validPassword){
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password"
            })
        }
        const authorized = []
        for(let i =0; i < user.roles.length; i++){
            authorized.push("ROLE_" + user.roles[i].name.toUpperCase())
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorized,
            accessToken: token
        })
    })
}