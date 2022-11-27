const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/userController.js");

router.get(
  "/",
  UserController.index
);

module.exports = router;
