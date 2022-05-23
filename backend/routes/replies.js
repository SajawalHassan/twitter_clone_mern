const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const Reply = require("../models/Reply");

const {
  repliesValidation,
  repliesEditValidation,
} = require("../utils/validation");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    // Validating info
    const { error } = repliesValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Getting info for new reply
    const newReply = new Reply({
      content: req.body.content,
      postId: req.body.postId,
      ownerId: req.user._id,
    });

    // Saving reply into db
    await newReply.save();

    res.json(newReply);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
