const User = require("../models/user.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // check if user exists
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
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(406).send({ message: "User doesn't exist! " });
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res.status(406).send({ message: " Invalid credentials! " });
  }
  const payload = { username: email, id: user._id };
  var token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  res.send({ message: "Logged in", token });
};

module.exports = { register, login };
