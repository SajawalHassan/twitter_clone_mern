const router = require("express").Router();

const User = require("../models/User");
const authenticateToken = require("../utils/authenticateToken");

router.get("/profile/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
