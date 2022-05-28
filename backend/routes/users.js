const router = require("express").Router();

const User = require("../models/User");
const authenticateToken = require("../middlewares/authenticateToken");
const bcrypt = require("bcrypt");

const { userEditValidation } = require("../utils/validation");
const Post = require("../models/Post");
const List = require("../models/List");

router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Getting user info
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

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
    // Finding user, deleting its posts and lists and deleting user
    const user = await User.findById(req.user._id);
    await Post.findOneAndDelete({ ownerId: user._id });
    await List.findOneAndDelete({ ownerId: user._id });
    await user.deleteOne();

    res.json("User deleted");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/follow/:id", authenticateToken, async (req, res) => {
  try {
    // Finding the user that wants to follow (user) and the one that is being followed (userFollowing)
    const user = await User.findById(req.user._id);
    const userFollowing = await User.findById(req.params.id);

    // Checking if the user is already following userFollowing
    if (user.following.includes(req.params.id)) {
      // Removing userFollowing id from users following id
      await user.updateOne({ $pull: { following: req.params.id } });
      // Removing users id from userFollowing followers id
      await userFollowing.updateOne({ $pull: { followers: req.user._id } });

      return res.json("User has been unfollowed");
    }

    // Adding userFollowing id to users following id
    await user.updateOne({ $push: { following: req.params.id } });
    // Adding users id to userFollowing followers id
    await userFollowing.updateOne({ $push: { followers: req.user._id } });

    res.json("User has been followed");
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

module.exports = router;
