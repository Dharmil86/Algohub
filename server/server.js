require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const Category = require('./models/category');
const Question = require("./models/question");
const contentRoutes = require("./routes/content");
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const promarkRoutes = require("./routes/promarks");
const dashRoutes = require("./routes/dashboard");

app.use(cors());



app.use(express.json());


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Error connecting to database", err);
    process.exit(1);
  }
};

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1", contentRoutes);
app.use("/api/v1", promarkRoutes);
app.use("/api/v1", dashRoutes);






startServer();
