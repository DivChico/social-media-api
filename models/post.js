const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("post", postSchema);
