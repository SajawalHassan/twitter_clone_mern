const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  displayName: {
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
  likedPosts: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Users", userSchema);
