const { Router } = require("express");
const TransactionController = require("../controllers/transactionController.js");
const router = Router();
const passport = require("passport");

router.post("/", TransactionController.create);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TransactionController.index
);

router.delete("/:id", TransactionController.remove);

router.put("/:id", TransactionController.update);
module.exports = router;
