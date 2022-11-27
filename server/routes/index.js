const TransactionRoutes = require("./transaction.js");
const AuthRoutes = require("./authentication");
const UserRoutes = require("./user.js");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send("GET request to the homepage");
});
router.use("/transaction", TransactionRoutes);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

module.exports = router;
