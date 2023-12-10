const express = require("express");
const { sendotp, register, login, forgotPassword, resetPassword, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.post("/sendotp", sendotp);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", auth, changePassword);

module.exports = router;