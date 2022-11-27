const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
