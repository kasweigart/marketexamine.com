const express = require("express");
const router = express.Router();
let Watchlist = require("../models/watchlist.model");

router.get("/", (req, res) => {
  Watchlist.find()
    .then((watchlists) => res.json(watchlists))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newWatchlist = Watchlist({
    username,
    description,
    duration,
    date,
  });

  newWatchlist
    .save()
    .then(() => res.json("Watchlist added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Watchlist.findById(req.params.id)
    .then((watchlist) => res.json(watchlist))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  Watchlist.findByIdAndDelete(req.params.id)
    .then(() => res.json("Watchlist deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
  Watchlist.findById(req.params.id)
    .then((watchlist) => {
      watchlist.username = req.body.username;
      watchlist.description = req.body.description;
      watchlist.duration = Number(req.body.duration);
      watchlist.date = Date.parse(req.body.date);

      watchlist
        .save()
        .then(() => res.json("Watchlist updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
