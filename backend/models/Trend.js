const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    defualt: Date.now(),
  },
});

module.exports = mongoose.model("hashtags", hashtagSchema);
