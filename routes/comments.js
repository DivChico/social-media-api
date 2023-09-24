const router = require("express").Router();
const Comment = require("../models/comment");
//add new comment
router.post("/", async (req, res) => {
  try {
    const newPost = await new Comment({
      userId: req.body.userId,
      parentId: req.body.parentId,
      postId: req.body.postId,
      desc: req.body.desc,
      level: req.body.level,
    });
    const comment = await newPost.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});
// getComments
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    comments.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json("hi");
  }
});
// delete comment
router.delete("/:commentId/delete", async (req, res) => {
  const CommentToDel = await Comment.findById(req.params.commentId);
  if (CommentToDel.userId === req.body.userId) {
    const post = await Comment.deleteOne({ _id: CommentToDel._id });
    res.status(200).json("comment deleted ");
  } else {
    res.status(400).json("you can only delete your own comments");
  }
});
// like comment
router.put("/:commentId/like", async (req, res) => {
  const CommentToLike = await Comment.findById(req.params.commentId);
  try {
    if (!CommentToLike.likes.includes(req.body.userId)) {
      await CommentToLike.updateOne({
        $push: { likes: req.body.userId },
      });
      res.status(200).json("like");
    } else {
      await CommentToLike.updateOne({
        $pull: { likes: req.body.userId },
      });
      res.status(200).json("unlike");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
