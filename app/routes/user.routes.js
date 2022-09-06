const { allAccess, userBoard, moderatorBoard } = require("../controllers/user.controller");
const {VerifyToken, isAdmin, isModerator} = require("../middlewares")

module.exports = function(app){
    app.use(function(req, res, next) {
     res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
     );
     next()
    })
    app.get("/api/test/all", allAccess)
    app.get("/api/test/user",[VerifyToken], userBoard)
    app.get("/api/test/mod", [VerifyToken, isModerator], moderatorBoard)
    app.get("/api/test/admin", [VerifyToken, isAdmin])
 }

