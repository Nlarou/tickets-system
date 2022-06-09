const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getRole,
  getStaffMembers,
  setRole,
} = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protectedRoute(), getMe);
router.get("/getRole", protectedRoute(), getRole);
router.get("/getStaffMembers", protectedRoute(), getStaffMembers);
router.put("/setRole", protectedRoute(), setRole);

module.exports = router;
