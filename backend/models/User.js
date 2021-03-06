const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  displayname: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  bio: {
    type: String,
    default: "",
    max: 160,
  },
  location: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  bookmarkedTweets: {
    type: Array,
    default: [],
  },
  noOfTweets: {
    type: Number,
    default: 0,
  },
  likedTweets: {
    type: Array,
    default: [],
  },
  banner: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Users", userSchema);
