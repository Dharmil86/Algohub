const express = require("express");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your profile!",
    user: req.user, 
  });
});

module.exports = router;
