const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};
