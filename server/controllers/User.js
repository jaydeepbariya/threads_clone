const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await Post.deleteMany({ postedBy: userId });
    await Comment.deleteMany({ user: userId });
    await Like.deleteMany({ user: userId });

    await user.remove();

    res
      .status(200)
      .json({
        success: true,
        message: "User and associated data deleted successfully",
      });
  } catch (error) {
    console.error("Delete User Error ", error);
    res.status(500).json({ success: false, message: "Delete User Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate({
        path: "profile",
        model: "Profile",
      })
      .populate({
        path: "posts",
        model: "Post"
      })
      .populate({
        path: "followers following",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
      });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "User data retrieved successfully.",
        user,
      });
  } catch (error) {
    console.error("Get User Error ", error);
    res.status(500).json({ error: "Get User Error" });
  }
};
