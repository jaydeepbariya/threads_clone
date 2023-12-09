const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  shares: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  ]
});

module.exports = mongoose.model("Post", postSchema);
