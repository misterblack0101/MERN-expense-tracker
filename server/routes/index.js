const TransactionRoutes = require("./transaction.js");
const AuthRoutes = require("./authentication");
const UserRoutes = require("./user.js");
const CategoryRoutes = require("./categories.js");
const { Router } = require("express");
const router = Router();
const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false });

router.get("/", (req, res) => {
  res.send("GET request to the homepage");
});
router.use("/transaction", auth, TransactionRoutes);
router.use("/auth", AuthRoutes);
router.use("/user", auth, UserRoutes);
router.use("/categories", auth, CategoryRoutes);

module.exports = router;
