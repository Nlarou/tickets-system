const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, createNote } = require("../controllers/noteController");

const { protectedRoute } = require("../middleware/authMiddleware");
router
  .route("/")
  .get(protectedRoute, getNotes)
  .post(protectedRoute, createNote);

module.exports = router;
