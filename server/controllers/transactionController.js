const Transaction = require("../models/transaction.js");

const successResponse = { message: "success" };

const index = async (req, res) => {
  const result = await Transaction.find({ userId: req.user._id }).sort({
    date: -1,
  });
  res.send(result);
};

const create = async (req, res) => {
  const tx = new Transaction({
    ...req.body,
    userId: req.user._id,
  });
  const result = await tx.save();
  res.send(successResponse);
};

const remove = async (req, res) => {
  const result = await Transaction.deleteOne({ _id: req.params.id });
  res.send(successResponse);
};

const update = async (req, res) => {
  const result = await Transaction.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(successResponse);
};

module.exports = { index, create, update, remove };
