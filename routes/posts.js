const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

const { route } = require("./posts");

// create a post
router.post("/", async (req, res) => {
  try {
    const newPost = await new Post({
      userId: req.body.userId,
      desc: req.body.desc,
      image: req.body.image,
    });
    const post = await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update post
router.put("/:postId", async (req, res) => {
  const postToEdit = await Post.findById(req.params.postId);
  if (postToEdit.userId === req.body.userId) {
    try {
      const post = await Post.findByIdAndUpdate(postToEdit._id, {
        $set: req.body,
      });
      res.status(200).json("post update");
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).json("you can only edit your own posts");
  }
});
// delete post
router.delete("/:postId", async (req, res) => {
  const postToEdit = await Post.findById(req.params.postId);
  if (postToEdit.userId === req.body.userId) {
    const post = await Post.deleteOne({ _id: postToEdit._id });
    res.status(200).json("post deleted ");
  } else {
    res.status(400).json("you can only delete your own posts");
  }
});
// like post
router.put("/:postId/like", async (req, res) => {
  const postToEdit = await Post.findById(req.params.postId);
  try {
    if (!postToEdit.likes.includes(req.body.userId)) {
      await postToEdit.updateOne({
        $push: { likes: req.body.userId },
      });
      res.status(200).json("like");
    } else {
      await postToEdit.updateOne({
        $pull: { likes: req.body.userId },
      });
      res.status(200).json("unlike");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
//get post
router.get("/:postId", async (req, res) => {
  try {
    const postToEdit = await Post.findById(req.params.postId);
    res.status(200).json(postToEdit);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let userPosts = await Post.find({ userId: req.params.userId });
    const friendPostsPromises = user.followings.map(async (friendId) => {
      let friendPosts = await Post.find({ userId: friendId });
      return friendPosts;
    });
    const friendPosts = await Promise.all(friendPostsPromises);
    const timeline = userPosts.concat(...friendPosts);
    timeline.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json(timeline);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get user posts
router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let userPosts = await Post.find({ userId: req.params.userId });

    userPosts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});
