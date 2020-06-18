const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
let User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({ name, email, password });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(() => {
          res.json("User added!");
          req.flash("success_msg", "You are now registered and can log in");
          res.redirect("/");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/my-watchlist',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
})

module.exports = router;
