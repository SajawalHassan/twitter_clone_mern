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

router.put("/edit/:id", authenticateToken, async (req, res) => {
  try {
    // Finding reply
    const reply = await Reply.findById(req.params.id);

    // Making sure user is owner of reply
    if (reply.ownerId !== req.user._id) {
      return res.status(400).json("You're not the owner of this post");
    }

    // Validating info
    const { error } = repliesEditValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    if (req.body.content == null) {
      return res.status(400).json("Please fill atleast one field!");
    }

    // Updating list info
    await reply.updateOne({ $set: req.body });

    res.json("Reply has been updated!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    // Finding reply
    const reply = await Reply.findById(req.params.id);

    // Making sure user is owner of reply
    if (reply.ownerId !== req.user._id) {
      return res.status(400).json("You're not the owner of this post");
    }

    // Updating list info
    await reply.deleteOne();

    res.json("Reply has been deleted!");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
