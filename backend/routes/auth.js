const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { registerValidation, loginValidation } = require("../utils/validation");
const generateAccessToken = require("../utils/generateAccessToken");
const RefreshToken = require("../models/RefreshToken");

router.post("/register", async (req, res) => {
  try {
    // Validating info
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // username validation
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).json("Username already exists");
    if (req.body.username.includes(" ")) {
      return res.status(400).json("username cannot have spaces");
    }

    // Making sure the email dosen't already exist
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json("Email already exists");

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Getting info for new user
    const newUser = new User({
      displayname: req.body.displayname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      month: req.body.month,
      day: req.body.day,
      year: req.body.year,
      banner: req.body.banner,
      profilePic: req.body.profilePic,
      bio: req.body.bio,
      location: req.body.location,
      website: req.body.website,
    });

    // Saving user into db
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

router.post("/register_err", async (req, res) => {
  try {
    // Validating info
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // username validation
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).json("Username already exists");
    if (req.body.username.includes(" ")) {
      return res.status(400).json("username cannot have spaces");
    }

    // Making sure the email dosen't already exist
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json("Email already exists");

    res.json("No errors!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Validating user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Making sure email is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Invalid email or password");

    // Making sure the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Invalid email or password");

    const userPayload = {
      _id: user._id,
      displayname: user.displayname,
      username: user.username,
      email: user.email,
    };

    // Generating access token
    const accessToken = generateAccessToken(userPayload);

    // Generating refresh token
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_TOKEN_SECRET
    );

    // Getting info for refresh token
    const newRefreshToken = new RefreshToken({
      refreshToken: refreshToken,
    });

    // Saving refresh token into db
    await newRefreshToken.save();

    res.json({
      _id: user._id,
      displayname: user.displayname,
      username: user.username,
      email: user.email,
      password: user.password,
      bookmarkedTweets: user.bookmarkedTweets,
      likedTweets: user.likedTweets,
      followers: user.followers,
      following: user.following,
      date: user.date,
      month: user.month,
      day: user.day,
      year: user.year,
      profilePic: user.profilePic,
      accessToken: accessToken,
      refreshToken: refreshToken,
      banner: user.banner,
      noOfTweets: user.noOfTweets,
      bio: user.bio,
      location: user.location,
      website: user.website,
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

router.post("/refresh/token", async (req, res) => {
  try {
    // Getting refresh token
    const refreshToken = req.body.token;

    // Finding refresh token
    const _refreshToken = await RefreshToken.findOne({
      refreshToken: refreshToken,
    });

    // Making sure there is a refresh token and that refresh token exists in db
    if (refreshToken == null) return res.sendStatus(401);
    if (!_refreshToken) return res.sendStatus(403);

    // Vaifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const userPayload = {
        _id: user._id,
        displayname: user.displayname,
        username: user.username,
        email: user.email,
        bookmarkedTweets: user.bookmarkedTweets,
        likedTweets: user.likedTweets,
        followers: user.followers,
        following: user.following,
        month: user.month,
        day: user.day,
        year: user.year,
        date: user.date,
        profilePic: user.profilePic,
      };

      // Generating access token
      const accessToken = generateAccessToken(userPayload);

      res.json({ accessToken });
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/logout", async (req, res) => {
  try {
    // Deleting refresh token
    await RefreshToken.findOneAndDelete({ refreshToken: req.body.token });
    res.json("Successfully logged out");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
