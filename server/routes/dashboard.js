const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Question = require("../models/question");

router.get("/dashboard/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("progress")
      .populate("bookmarks");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const totalQuestions = await Question.countDocuments();

    res.json({
      success: true,
      totalQuestions,
      solvedCount: user.progress.length,
      bookmarkedCount: user.bookmarks.length,
      solved: user.progress,         
      bookmarked: user.bookmarks 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;