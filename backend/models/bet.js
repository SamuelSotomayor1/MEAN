const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  match: {
    type: String,
    required: true
  },
  amountBet: {
    type: Number,
    required: true
  },
  amountWon: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ganado', 'perdido', 'cashout'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Bet', betSchema);