  const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const watchlistSchema = Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Watchlist = mongoose.model('Exercise', watchlistSchema);

module.exports = Watchlist;