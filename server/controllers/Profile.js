const User = require("../models/User");
const Profile = require("../models/Profile");

exports.addProfile = async ( req,res ) => {
    try {
        const { userId } = req.params;
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        
        if( !gender || !dateOfBirth || !about || !contactNumber ){
            return res.status(400).json({ success: false, message: "All fields required"});
        }

        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found"});
        }
    
        const profile = new Profile({
          gender,
          dateOfBirth,
          about,
          contactNumber
        });
    
        user.profile = profile;
        await user.save();
    
        res.status(201).json({ success: true, message: "Profile added successfully", profile });
      } catch (error) {
        console.error("Add Profile Error ", error);
        res.status(500).json({ success: true, message: "Add Profile Error" });
      }
}

exports.editProfile = async ( req,res ) => {
    try {
        const { userId } = req.params;
        const { gender, dateOfBirth, about, contactNumber } = req.body;
    
        const user = await User.findById(userId).populate("profile");
    
        if (!user || !user.profile) {
          return res.status(404).json({ success: false, message: "Profile not found" });
        }
    
        const updatedProfile = {
          gender: gender || user.profile.gender,
          dateOfBirth: dateOfBirth || user.profile.dateOfBirth,
          about: about || user.profile.about,
          contactNumber: contactNumber || user.profile.contactNumber,
        };
    
        user.profile = updatedProfile;
        await user.profile.save();
    
        res.status(200).json({ success: true, message: "Profile updated successfully", profile: user.profile });
      } catch (error) {
        console.error("Update Profile Error ", error);
        res.status(500).json({ success: true, message: "Update Profile Error" });
      }
}

exports.getProfile = async ( req,res ) => {
    try {
        const { userId } = req.params;
    
        const user = await User.findById(userId).populate('profile');
    
        if (!user || !user.profile) {
          return res.status(404).json({ success: false, message: "User profile not found" });
        }
    
        res.status(200).json({ success: true, message: "Profile fetched successfully", profile: user.profile });

      } catch (error) {
        console.error('Get Profile Error ', error);
        res.status(500).json({ success: true, message: 'Get Profile Error' });
      }
}

exports.deleteProfile = async ( req,res ) => {
    try {
        const { userId } = req.params;
    
        const user = await User.findById(userId);
    
        if (!user || !user.profile) {
          return res.status(404).json({ success: false, message: "Profile not found" });
        }
    
        await Profile.findByIdAndDelete(user.profile);
    
        user.profile = null;
        await user.save();
    
        res.status(200).json({ success: true, message: "Profile deleted successfully" });
      } catch (error) {
        console.error("Delete Profile Error ", error);
        res.status(500).json({ success: true, message: "Delete Profile Error" });
      }
}