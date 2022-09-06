const db = require("../models")
const Roles = db.Roles
const User = db.user

exports.checkDuplicates = (req,res,next) => {
    //Check Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(500).json({
                sucess: false,
                message: err
            })
            return;
        }
        if(user){
            res.status(400).json({
                sucess: true,
                message: "Failed! Username is already in use"
            })
        }
    })
    //Check Email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err){
            res.status(500).json({
                sucess: false,
                message: err
            })
            return;
        }
        if(user){
            res.status(400).json({
                sucess: true,
                message: "Failed! Email is already in use"
            })
        }
    })
}

exports.checkIfRolesExist = (req, res, next) =>{
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!Roles.includes(req.body.roles[i])){
                res.status(400).json({
                    success: false,
                    message: `Failed! Role ${req,body.roles[i]} does not exist`
                })
                return;
            }
        }
    }
}

