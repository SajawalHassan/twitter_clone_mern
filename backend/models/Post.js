const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  textfield: {
    type: String,
    default: "",
    max: 280,
  },
  image: {
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
