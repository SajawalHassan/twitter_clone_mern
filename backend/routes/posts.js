const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const Post = require("../models/Post");

const { postsValidation } = require("../utils/validation");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    // Validating info
    const { error } = postsValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    if ((req.body.title == null) & (req.body.picture == null)) {
      return res.status(400).json("Fill one of the fields");
    }

    // Getting info for new post
    const newPost = new Post({
      title: req.body.title,
      picture: req.body.picture,
      ownerId: req.user._id,
    });

    // Saving new post
    await newPost.save();

    res.json(newPost);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/edit/:id", authenticateToken, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    if (post.ownerId !== req.user._id) {
      return res.status(400).json("You're not the owner of this post");
    }

    // Validating info
    const { error } = postsValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    if ((req.body.title == null) & (req.body.picture == null)) {
      return res.status(400).json("Fill one of the fields");
    }

    // Editing post
    await post.updateOne({ $set: req.body });

    res.json("Post has been updated!");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
