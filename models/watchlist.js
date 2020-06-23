const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
