const express = require("express");
const userRouter = express.Router();
const passport = require("passport")
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");

const signToken = (userID) => {
  return jwt.sign(
    {
      iss: "marketexamine",
      sub: userID,
    },
    "marketexamine",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "An error has occurred.", msgError: true } });
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
              msgBody: "Your account was successfully registered. Redirecting to the home page... You may now log in.",
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, email, password } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { _id, email, password } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.post(
  "/watchlist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const watchlist = new Watchlist(req.body);
    watchlist.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.watchlist.push(watchlist);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully created todo",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

userRouter.get(
  "/watchlist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("watchlist")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ todos: document.watchlist, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(res.data)
    // const { email, password } = req.user;
    // res.status(200).json({ isAuthenticated: true, user: { email, password } });
  }
);

module.exports = userRouter;
