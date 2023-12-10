const User = require("../models/User");
const Profile = require("../models/Profile");

exports.addProfile = async ( req,res ) => {
    try {
        const { userId } = req.user;
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
        const { userId } = req.user;
        const { gender, dateOfBirth, about, contactNumber } = req.body;
    
        const user = await User.findById(userId).populate("additionalDetails");
    
        if (!user || !user.additionalDetails) {
          return res.status(404).json({ success: false, message: "Profile not found" });
        }
    
        let updatedProfile = {
          gender: gender || user.profile.gender,
          dateOfBirth: dateOfBirth || user.profile.dateOfBirth,
          about: about || user.profile.about,
          contactNumber: contactNumber || user.profile.contactNumber,
        };

        updateProfile = await Profile.findByIdAndUpdate(user.additionalDetails, updatedProfile, { new:true });
    
        res.status(200).json({ success: true, message: "Profile updated successfully", profile: updateProfile });
      } catch (error) {
        console.error("Update Profile Error ", error);
        res.status(500).json({ success: true, message: "Update Profile Error" });
      }
}
