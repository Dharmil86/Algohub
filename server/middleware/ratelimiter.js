const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: "Too many wrong attempts, please try again after 10 minutes."
  }
});

module.exports = rateLimiter;
