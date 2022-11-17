const express = require("express");
const cors = require("cors");
require("./config.js");
const Transaction = require("./models/transaction");
const { default: transaction } = require("./models/transaction");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.post("/transaction", async (req, res) => {
  const tx = new Transaction(req.body);
  const result = await tx.save();
  res.send(result);
});

app.listen(4000);
