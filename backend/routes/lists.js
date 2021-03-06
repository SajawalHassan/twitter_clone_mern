const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const List = require("../models/List");
const Post = require("../models/Post");

const { listsValidation, listsEditValidation } = require("../utils/validation");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    // Validation
    const { error } = listsValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Getting info for new list
    const newList = new List({
      title: req.body.title,
      description: req.body.description,
      members: req.body.members,
      ownerId: req.user._id,
    });

    // Saving list into database
    await newList.save();

    res.json(newList);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/edit/:id", authenticateToken, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (list.ownerId !== req.user._id) {
      return res.status(400).json("You're not the owner of this post");
    }

    // Validating info
    const { error } = listsEditValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    if (
      (req.body.title == null) &
      (req.body.description == null) &
      (req.body.members == null)
    ) {
      return res.status(400).json("Please fill atleast one field!");
    }

    // Updating list info
    await list.updateOne({ $set: req.body });

    res.json("List has been updated!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (list.ownerId !== req.user._id) {
      return res.status(400).json("You're not the owner of this post");
    }

    // Deleting list
    await list.deleteOne();

    res.json("List deleted!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    // Finding list
    const list = await List.findById(req.params.id);
    // Getting members from list
    const members = await list.members;
    // Getting posts from members
    const posts = await Post.find({ ownerId: members });

    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
