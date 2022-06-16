const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const Post = require("../models/Post");
const User = require("../models/User");

const { postsValidation } = require("../utils/validation");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    if ((req.body.textfield == "") & (req.body.image == "")) {
      return res.status(400).json("Please fill one of the fields");
    }

    const { error } = postsValidation(req.body);
    console.log(error);
    if (error) return res.status(400).json(error.details[0].message);

    // Getting info for new post
    const newPost = new Post({
      textfield: req.body.textfield,
      image: req.body.image,
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
    if ((req.body.textfield == null) & (req.body.image == null)) {
      return res.status(400).json("Fill one of the fields");
    }

    // Updating post
    await post.updateOne({ $set: req.body });

    res.json("Post has been updated!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    if (post.ownerId !== req.user._id) {
      return res.status(400).json("You're not the owner of this post");
    }

    // Deleting post
    await post.deleteOne();

    res.json("Post has been deleted!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/like/:id", authenticateToken, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    // Removing user id from the likes array if post is already liked
    if (post.likes.includes(req.user._id)) {
      await post.updateOne({ $pull: { likes: req.user._id } });

      // Removing post id from users liked posts
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { likedTweets: post._id },
      });

      return res.json("Like removed");
    }

    // Adding user id to posts likes array
    await post.updateOne({ $push: { likes: req.user._id } });

    // Adding post id to user liked posts
    await User.findByIdAndUpdate(req.user._id, {
      $push: { likedTweets: post._id },
    });

    res.json("Like added!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/retweet/:id", authenticateToken, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    // Getting info for new post
    const newPost = new Post({
      textfield: post.textfield,
      image: post.image,
      ownerId: post.ownerId,
      repostOwnerId: req.user._id,
    });

    // Adding post to db
    await newPost.save();

    res.json("Post retweeted!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/bookmark/:id", authenticateToken, async (req, res) => {
  try {
    // Finding post and user
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);

    // Removing the post id from users bookmarked tweets if it is already bookmarked
    if (user.bookmarkedTweets.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarkedTweets: post._id } });

      return res.json("Bookmark removed");
    }

    // Adding the post id to users bookmarked tweets
    await user.updateOne({ $push: { bookmarkedTweets: post._id } });

    res.json("Post bookmarked!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/recommendation", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find();
    const ownerId = posts.map(({ ownerId }) => {
      return ownerId;
    });
    const ownerInfo = await User.findOne({ _id: ownerId });

    res.json({ posts, ownerInfo });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
