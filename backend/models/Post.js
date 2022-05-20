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
  likes: {
    type: Array,
    default: [],
  },
  ownerId: {
    type: String,
    required: true,
  },
  repostOwnerId: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", postSchema);
