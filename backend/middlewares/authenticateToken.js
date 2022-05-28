const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Getting auth header
  const token = authHeader && authHeader.split(" ")[1]; // Getting access token from auth header
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Making sure the token is valid
    req.user = user;
    next();
  });
};
