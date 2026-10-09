const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

module.exports = router;