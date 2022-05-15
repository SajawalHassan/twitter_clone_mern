const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({
  refreshToken: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("RefreshTokens", refreshTokenSchema);
