const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const { fileUploader } = require("../util/fileUploader");
require("dotenv").config();

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (posts.length > 0) {
      res
        .status(200)
        .json({ success: true, message: "Posts fetched successfully", posts });
    } else {
      res.status(200).json({ success: false, message: "No posts found" });
    }
  } catch (error) {
    console.error("Get All Posts Error ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ postedBy: userId });

    if (posts.length > 0) {
      res
        .status(200)
        .json({ success: true, message: "Posts fetched successfully", posts });
    } else {
      res
        .status(200)
        .json({
          success: false,
          message: "No posts found for the given userId",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Get Posts By UserId Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (post) {
      res
        .status(200)
        .json({ success: true, message: "Post Fetched Successfully", post });
    } else {
      res
        .status(200)
        .json({
          success: false,
          message: "No post found for the given postId",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Get Post By PostId Error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const { userId } = req.user;
    const { image } = req.files;

    const result = await fileUploader(image, process.env.FOLDER_NAME);

    const post = new Post({
      caption,
      image: result.secure_url,
      comments: [],
      likes: [],
      shares: [],
      postedBy: userId,
    });

    await post.save();

    res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.error("Post Creation Error ", error);
    res.status(500).json({ error: "Post Creation Error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;
    const { image } = req.files;

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    let imageUrl = existingPost.image;

    if (image) {
      const result = await fileUploader(image, process.env.FOLDER_NAME);
      imageUrl = result.secure_url;
    }

    existingPost.caption = caption;
    existingPost.image = imageUrl;

    await existingPost.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Post updated successfully",
        post: existingPost,
      });
  } catch (error) {
    console.error("Post Update Error ", error);
    res.status(500).json({ error: "Post Update Error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    await Like.deleteMany({ post: existingPost._id });

    await Comment.deleteMany({ post: existingPost._id });

    await existingPost.remove();

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Post Deletion Error ", error);
    res.status(500).json({ success: true, message: "Post Deletion Error" });
  }
};

exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ success: true, message: "Post not found" });
    }

    existingPost.shares.push(userId);

    await existingPost.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Post shared successfully",
        post: existingPost,
      });
  } catch (error) {
    console.error("Post Share Error ", error);
    res.status(500).json({ error: "Post Share Error" });
  }
};
