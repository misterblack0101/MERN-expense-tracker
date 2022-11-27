const { Router } = require("express");
const router = Router();
const passport = require("passport");
const UserController = require("../controllers/userController.js");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.index
);

module.exports = router;
