const express = require("express");
const cors = require("cors");
require("./config.js");
const TransactionRoutes = require("./routes/transaction.js");
const AuthRoutes = require("./routes/authentication");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});
app.use("/", TransactionRoutes);
app.use("/", AuthRoutes);

app.listen(4000);
