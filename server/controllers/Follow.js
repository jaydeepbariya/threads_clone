const User = require("../models/User");

exports.followUser = async (req,res) => {
    try {
        const { userId } = req.user; 
        const followedUserId = req.params.userId;
    
        const user = await User.findById(userId);
        const followedUser = await User.findById(followedUserId);
    
        if (!user || !followedUser) {
          return res.status(404).json({ success:true, message:"User not found" });
        }
    
        if (user.following.includes(followedUserId)) {
          return res.status(400).json({ success:false, message: "You are already following this user" });
        }
    
        followedUser.followers.push(userId);
    
        user.following.push(followedUserId);
    
        await user.save();

        await followedUser.save();
    
        res.status(200).json({ success: true, message: "User followed successfully" });

      } catch (error) {
        console.error("Follow User Error ", error);
        res.status(500).json({ success:false, message: "Follow User Error" });
      }
}

exports.unfollowUser = async (req,res) => {
    try {
        const { userId } = req.user;
        const unfollowedUserId = req.params.userId;


        const user = await User.findById(userId);
        const unfollowedUser = await User.findById(unfollowedUserId);
    
        if (!user || !unfollowedUser) {
          return res.status(404).json({success:true, message:"User not found"});
        }
    
        if (!user.following.includes(unfollowedUserId)) {
          return res.status(400).json({success:true, message:"You are not following this user"});
        }
    
        unfollowedUser.followers = unfollowedUser.followers.filter((follower) => follower !== userId);
        user.following = user.following.filter((followingUser) => followingUser !== unfollowedUserId);
    
        await user.save();
        await unfollowedUser.save();
    
        res.status(200).json({success:true, message:"User unfollowed successfully"});
      } catch (error) {
        console.error('Unfollow User Error ', error);
        res.status(500).json({ error: 'Unfollow User Error' });
      }
}