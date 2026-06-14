const User = require("../models/User");
const cloudinary =
  require("../config/cloudinary");

const getProfile =
  async (req, res) => {
    try {

      const user =
        await User.findById(
          req.user._id
        ).select("-password");

      res.status(200).json({
        success: true,
        user,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};

const updateProfile =
  async (req, res) => {
    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      user.phone =
        req.body.phone ??
        user.phone;

      user.college =
        req.body.college ??
        user.college;

      user.bio =
        req.body.bio ??
        user.bio;

      user.skills =
        req.body.skills ??
        user.skills;

      user.shortGoal =
        req.body.shortGoal ??
        user.shortGoal;

      user.longGoal =
        req.body.longGoal ??
        user.longGoal;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};

const uploadAvatar =
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "No image uploaded",
        });
      }

      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder:
              "padhlo-profile",
          }
        );

      const user =
        await User.findById(
          req.user._id
        );

      user.avatar =
        result.secure_url;

      await user.save();

      res.status(200).json({
        success: true,
        avatar:
          result.secure_url,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
};