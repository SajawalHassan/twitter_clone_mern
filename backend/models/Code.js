const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Codes", codeSchema);
