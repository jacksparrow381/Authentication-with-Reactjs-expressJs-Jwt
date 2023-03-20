const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Lets create our fisrt route --  We will signUp a user
router.post("/signUp", async (req, res) => {
  try {
    // Lets hash the password
    const salt = await bcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Lets create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.send("Sign Up Routes");
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Lets check if the email is in the database
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    // Lets check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");

    // Lets create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      res.send(user.name);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logout");
});

module.exports = router;
