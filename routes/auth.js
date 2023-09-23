const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//register
router.post("/register", async (req, res) => {
  // const newUser = await new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  try {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedPassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
  console.log("register");
});
//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      validatePassword ? null : res.status(400).json("wrong password");
      res.status(200).json(user);
    } else {
      res.status(404).json("user not found");
    }
    console.log("login");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
