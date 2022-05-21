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

router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    // Finding list
    const list = await List.findById(req.params.id);
    const members = await list.members;
    const posts = await Post.find({ ownerId: members });
    console.log(members[0]);

    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

module.exports = router;
