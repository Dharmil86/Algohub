const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../middleware/middleware");
const router = express.Router();
const rateLimiter = require("../middleware/ratelimiter");


router.post("/register", rateLimiter, async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET || "mysecret",
            { expiresIn: "7d" }
        );

        res.json({ success: true, token, user: { id: newUser._id, name, email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }


});

router.post("/login", rateLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ success: false, message: "Invalid Username or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid Username or Password" });
        }

        const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "mysecret",
        { expiresIn: "7d" }
        );

        res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });

    }
});

router.get("/me", authenticateUser, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
