const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//update user info
router.put("/:userId", async (req, res) => {
  if (req.body._id === req.params.userId) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (err) {
        return res.status(400).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $set: req.body,
      });
      res.status(200).json("acount update");
    } catch (err) {
      return res.status(400).json(err);
    }
  }
});
// all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find(
      {},
      {
        password: false,
        followers: false,
        coverPicture: false,
        followings: false,
        isAdmin: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        city: false,
        from: false,
        relation: false,
        desc: false,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});
// get emails
router.get("/email", async (req, res) => {
  try {
    const user = await User.find(
      {},
      {
        password: false,
        followers: false,
        coverPicture: false,
        followings: false,
        isAdmin: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        city: false,
        from: false,
        relation: false,
        desc: false,
        _id: false,
        username: false,
        profilePicture: false,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});
// get emails
router.get("/username", async (req, res) => {
  try {
    const user = await User.find(
      {},
      {
        password: false,
        followers: false,
        coverPicture: false,
        followings: false,
        isAdmin: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        city: false,
        from: false,
        relation: false,
        desc: false,
        _id: false,
        email: false,
        profilePicture: false,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// delete account
router.delete("/:userId", async (req, res) => {
  if (req.body._id === req.params.userId) {
    try {
      const user = await User.deleteOne({ _id: req.params.userId });
      res.status(200).json("acount deleted");
      console.log("acount deleted");
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    console.log("cant delete");
    return res.status(400).json("cant delete");
  }
});
// get user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, updatedAt, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(404).json("user not found ");
  }
});
// follow user
router.put("/:userId/follow", async (req, res) => {
  console.log(req.body._id);
  console.log(req.params.userId);

  if (req.body._id !== req.params.userId) {
    try {
      const userToFollow = await User.findById(req.params.userId);
      const user = await User.findById(req.body._id);
      if (!user.followings.includes(userToFollow._id)) {
        await user.updateOne({
          $push: { followings: userToFollow._id },
        });

        await userToFollow.updateOne({
          $push: { followers: user._id },
        });
        console.log(`${user.username} followed ${userToFollow.username}`);
        res
          .status(200)
          .json(`${user.username} followed ${userToFollow.username}`);
      } else {
        return res.status(500).json("already following");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("you cant follow yourself");
  }
});
//unfollow user
router.put("/:userId/unfollow", async (req, res) => {
  if (req.body._id !== req.params.userId) {
    try {
      const userToFollow = await User.findById(req.params.userId);
      const user = await User.findById(req.body._id);
      if (user.followings.includes(userToFollow._id)) {
        await user.updateOne({
          $pull: { followings: userToFollow._id },
        });

        await userToFollow.updateOne({
          $pull: { followers: user._id },
        });
        res
          .status(200)
          .json(`${user.username} unfollowed ${userToFollow.username}`);
      } else {
        return res.status(500).json("already unfollowed");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("you cant unfollow yourself");
  }
});

module.exports = router;
