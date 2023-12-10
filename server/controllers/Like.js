const Post = require("../models/Post");
const Like = require("../models/Like");

exports.likePost = async (req,res) => {
    try {
        const { userId } = req.user; 
        const { postId } = req.params; 
    
        if (!postId) {
          return res.status(400).json({ success:false, message: "Invalid postId" });
        }
    
        const existingPost = await Post.findById(postId);
    
        if (!existingPost) {
          return res.status(404).json({ success:false, message: "Post not found" });
        }
    
        const existingLike = await Like.findOne({ user:userId, post:postId });
    
        console.log(existingLike);

        if(existingLike) {
          return res.status(400).json({ success:false, message: "Liked the post already" });
        }
    
        const newLike = await Like.create({ user:userId, post:postId });
    
        existingPost.likes.push(newLike._id);
    
        await existingPost.save();
    
        res.status(200).json({ success: true, message: "Post liked successfully" });
      } catch (error) {
        console.error('Add Like Error ', error);
        res.status(500).json({ error: 'Add Like Error' });
      }
}

exports.unlikePost = async (req,res) => {
    try {
        const { userId } = req.user; 
        const { postId } = req.params; 
    
        if (!postId) {
          return res.status(400).json({ success: false, message: "Invalid postId" });
        }
    
        const existingPost = await Post.findById(postId);
    
        if (!existingPost) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }
    
        const existingLike = await Like.findOne({ user: userId, post: postId });
    
        if (!existingLike) {
          return res.status(400).json({ success: false, message: "You have not liked this post" });
        }
    
        await existingLike.deleteOne({ user: userId, post: postId });
    
        existingPost.likes.pull(existingLike._id);
    
        await existingPost.save();
    
        res.status(200).json({ success: true, message: "Post unliked successfully" });

      } catch (error) {
        console.error("Unlike Post Error ", error);
        res.status(500).json({ success: false, message: "Unlike Post Error" });
      }
}