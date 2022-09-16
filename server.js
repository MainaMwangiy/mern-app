require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

const corOptions = {
  origin: "http://localhost:3000",
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

app.use(cors(corOptions));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected successfully");
    initial();
  })
  .catch((err) => {
    console.error(`Error, ${err}`);
    process.exit();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to fastlinker application",
  });
});

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(PORT, () => {
  console.log("App Running on PORT: ", PORT);
});

//Roles function
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
        console.log(`Added 'user' to roles collection`);
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
        console.log(`Added 'admin' to roles collection`);
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("Error", err);
        }
        console.log(`Added 'moderator' to roles collection`);
      });
    }
  });
}
