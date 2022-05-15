const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Users", userSchema);
