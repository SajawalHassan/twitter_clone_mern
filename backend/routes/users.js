const router = require("express").Router();

const User = require("../models/User");
const authenticateToken = require("../middlewares/authenticateToken");
const bcrypt = require("bcrypt");

const { userEditValidation } = require("../utils/validation");

router.get("/profile/:id", authenticateToken, async (req, res) => {
  try {
    // Getting user info
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/edit", authenticateToken, async (req, res) => {
  try {
    // Validating info
    const { error } = userEditValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    if (req.body == null) {
      return res.status(400).json("Please fill atleast one field!");
    }

    // Hashing password
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Updating user info
    await User.findByIdAndUpdate(req.user._id, {
      $set: req.body,
    });

    res.json("User updated");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/delete", authenticateToken, async (req, res) => {
  try {
    // Deleting user
    await User.findByIdAndDelete(req.user._id);

    res.json("User deleted");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/follow/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userFollowing = await User.findById(req.params.id);

    if (user.following.includes(req.params.id)) {
      await user.updateOne({ $pull: { following: req.params.id } });
      await userFollowing.updateOne({ $pull: { followers: req.user._id } });

      return res.json("User has been unfollowed");
    }

    await user.updateOne({ $push: { following: req.params.id } });
    await userFollowing.updateOne({ $push: { followers: req.user._id } });

    res.json("User has been followed");
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

module.exports = router;
