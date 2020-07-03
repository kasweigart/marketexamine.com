const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
require("dotenv");

userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "An error has occurred.", msgError: true },
      });
    if (user)
      res.status(400).json({
        message: { msgBody: "This email is already taken.", msgError: true },
      });
    else {
      const newUser = new User({ name, email, password });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "An error has occurred.", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody:
                "Your account was successfully registered. Redirecting to the home page... You may now log in.",
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

userRouter.get("/my-watchlist", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = userRouter;
