const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    postId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 500,
      require: true,
    },

    likes: {
      type: Array,
      default: [],
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment", commentSchema);
