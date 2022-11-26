const { Router, response } = require("express");
const Transaction = require("../models/transaction.js");
const passport = require("passport");

const router = Router();

const successResponse = { message: "success" };

router.post("/transaction", async (req, res) => {
  const tx = new Transaction(req.body);
  const result = await tx.save();
  res.send(successResponse);
});

router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false  }),
  async (req, res) => {
    const result = await Transaction.find().sort({ date: -1 });
    res.send(result);
  }
);

router.delete("/transaction/:id", async (req, res) => {
  const result = await Transaction.deleteOne({ _id: req.params.id });
  res.send(successResponse);
});

router.put("/transaction/:id", async (req, res) => {
  const result = await Transaction.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(successResponse);
});
module.exports = router;
