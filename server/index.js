const express = require("express");
const cors = require("cors");
require("./config/mongodb.js");
require("dotenv").config();
const passport = require("passport");
const passportConfig = require("./config/passport.js");
const routes = require("./routes/index.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

app.use("/", routes);

app.listen(4000);
