const { Router } = require("express");
const Transaction = require("../models/transaction.js");

const router = Router();

router.post("/transaction", async (req, res) => {
  const tx = new Transaction(req.body);
  const result = await tx.save();
  res.send(result);
});

router.get("/transactions", async (req, res) => {
  const result = await Transaction.find().sort({ date: -1 });
  res.send(result);
});

module.exports = router;
