const { Router, response } = require("express");
const User = require("../models/user.js");
const router = Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const user = await User.find({ email });
  if (user.length > 0) {
    return res
      .status(406)
      .send({ message: "User with same email already exists" });
  }

  //  hashing password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const tx = new User({ ...req.body, password: hashedPassword });
  tx.save()
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(406).send({ message: err.message }));
});

router.post("/login", async (req, res) => {
  const result = await User.find(req.body);
  if (result.length == 0) {
    return res.status(406).send({ message: "User doesn't exist" });
  }
  res.send(result);
});

module.exports = router;
