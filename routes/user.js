const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const apiKey = process.env.IEXCLOUD_SECRET_KEY;
const axios = require("axios");
require("dotenv");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.email = user;
    console.log(user);
    next();
  });
}

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
            watchlist: user.watchlist,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY);
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

userRouter.post("/my-watchlist", authenticateToken, (req, res) => {
  const newStock = new Watchlist({ name: req.body.stockSymbol });
  newStock.save(() => {
    User.findById({ _id: req.email._id })
      .then((user) => {
        user.watchlist.push(newStock);
        user.save();
      })
      .catch((err) => console.log(err));
  });
});

userRouter.get("/my-watchlist", authenticateToken, (req, res) => {
  User.findById({ _id: req.email._id })
    .populate("watchlist")
    .exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        res.status(200).json({ watchlist: document.watchlist });
      }
    });
});

userRouter.post("/my-watchlist/delete", authenticateToken, (req, res) => {
  User.findById({ _id: req.email._id })
    .then((user) => {
      const index = user.watchlist.indexOf(req.body.stockSymbol);
      user.watchlist.splice(index, 1);
      res.json({ msg: 'Stock deleted'})
      user.save();
    })
    .catch((err) => console.log(err));
});

userRouter.post("/api/my-watchlist", authenticateToken, (req, res) => {
  axios
    .get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${req.body.stocks}&types=quote&range=1m&last=5&token=${apiKey}`
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = userRouter;
