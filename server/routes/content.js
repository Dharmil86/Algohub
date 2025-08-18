const express = require("express");
const Category = require("../models/category");
const Question = require("../models/question");
const router = express.Router();

router.get("/content", async (req, res) => {
  try {
    let { page = 1, limit = 5, sortBy } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const total = await Category.countDocuments();

    const categories = await Category.find()
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("ques"); 

    res.json({
      success: true,
      page,
      limit,
      total,
      data: categories
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
