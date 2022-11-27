const express = require("express");
const cors = require("cors");
require("./config/mongodb.js");
require("dotenv").config();
const TransactionRoutes = require("./routes/transaction.js");
const AuthRoutes = require("./routes/authentication");
const UserRoutes = require("./routes/user.js");
const passport = require("passport");
const passportConfig = require("./config/passport.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});
app.use("/transaction", TransactionRoutes);
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);

app.listen(4000);
