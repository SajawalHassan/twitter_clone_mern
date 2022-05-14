const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { registerValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  try {
    // Making sure the email doesn't exist already
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json("Email already exists");
    }

    // Validating info
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Getting info for new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Saving user into db
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
