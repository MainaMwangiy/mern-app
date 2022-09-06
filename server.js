const express = require("express")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 5000

const corOptions = {
    origin: "https://localhost:5000"
}

const db = require("./app/models")
const Role = db.role

let uri = "mongodb+srv://maina:Winpcap@cluster0.xoxs528.mongodb.net/fastlinker-blog"

db.mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected successfully")
}).catch((err)=>console.log(`Error, ${err}`))

app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (res) =>{
    res.json({
        success: true,
        message: "Welcome to fastlinker application"
    })
})

// Routes
require("./app/routes/auth.routes")(app)
require("./app/routes/user.routes")(app)

app.listen(PORT,() => {
    console.log("App Running on PORT: ", PORT)
})

//Roles function
function initial(){
    Role.estimatedDocumentCount((err, count) =>{
        if(!err && count === 0){
            new Role({
                name: "user"
            }).save(err => {
                if(err){
                    console.log("Error", err)
                }
                console.log(`Added 'user' to roles collection`)
            })
            new Role({
                name: "admin"
            }).save(err => {
                if(err){
                    console.log("Error", err)
                }
                console.log(`Added 'admin' to roles collection`)
            })
            new Role({
                name: "moderator"
            }).save(err => {
                if(err){
                    console.log("Error", err)
                }
                console.log(`Added 'moderator' to roles collection`)
            })
        }
    })
}