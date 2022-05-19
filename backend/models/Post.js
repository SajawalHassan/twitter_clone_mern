const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
    max: 280,
  },
  picture: {
    type: String,
    default: "",
  },
  ownerId: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", postSchema);
