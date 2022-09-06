const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.VerifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).json({ success: false, message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res
          .status(403)
          .json({ success: false, message: "Admin Role Required!!" });
        return;
      }
    );
  });
};

exports.isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).json({ success: false, message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res
          .status(403)
          .json({ success: false, message: "Moderator Role Required!!" });
        return;
      }
    );
  });
};
