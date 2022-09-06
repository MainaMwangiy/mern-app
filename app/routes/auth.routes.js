const controller = require("../controllers/auth.controller");
const {checkDuplicates, checkIfRolesExist} = require("../middlewares")

// const   = require("../controllers")

module.exports = function(app){
   app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next()
   })
   app.post("/api/v1/create-new-user", [
    checkDuplicates, 
    checkIfRolesExist
   ], 
    controller.AddUser
   )
   app.post("/api/v1/login", controller.Login)
}