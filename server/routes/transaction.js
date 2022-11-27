const { Router } = require("express");
const TransactionController = require("../controllers/transactionController.js");
const router = Router();

router.post("/", TransactionController.create);

router.get(
  "/",
  TransactionController.index
);

router.delete("/:id", TransactionController.remove);

router.put("/:id", TransactionController.update);
module.exports = router;
