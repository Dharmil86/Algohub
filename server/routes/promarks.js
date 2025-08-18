const express = require("express");
const User = require("../models/user");
const authenticateUser  = require("../middleware/middleware");
const router = express.Router();

// Add bookmark
router.post("/user/bookmarks", authenticateUser, async (req, res) => {
  try {
    const { questionId } = req.body;
    if (!questionId) {
      return res.status(400).json({ success: false, message: "Question ID required" });
    }

    const user = await User.findById(req.user.id);
    if (!user.bookmarks.includes(questionId)) {
      user.bookmarks.push(questionId);
      await user.save();
    }

    res.json({ success: true, bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get bookmarks
router.get("/user/bookmarks", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");
    res.json({ success: true, bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Mark progress (completed question)
router.post("/user/progress", authenticateUser, async (req, res) => {
  try {
    const { questionId } = req.body;
    if (!questionId) {
      return res.status(400).json({ success: false, message: "Question ID required" });
    }

    const user = await User.findById(req.user.id);
    if (!user.progress.includes(questionId)) {
      user.progress.push(questionId);
      await user.save();
    }

    res.json({ success: true, progress: user.progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get progress
router.get("/user/progress", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("progress");
    res.json({ success: true, progress: user.progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
