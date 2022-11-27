const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  userId: mongoose.Types.ObjectId,
  categoryId: mongoose.Types.ObjectId,
  date: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Transaction", transactionSchema);
