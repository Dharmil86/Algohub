require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const Category = require("./models/category");
const Question = require("./models/question");

const DATA_URL = "https://test-data-gules.vercel.app/data.json";

async function seedDB() {
  try {
    // connect
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // clear old data
    await Category.deleteMany({});
    await Question.deleteMany({});
    console.log("🗑️ Old data cleared");

    // fetch data
    const response = await axios.get(DATA_URL);

// if your JSON has { status: true, data: [...] }
const rawData = response.data.data;  

if (!Array.isArray(rawData)) {
  throw new Error("Data is not an array!");
}

    for (const cat of rawData) {
      console.log(`➡️ Seeding category: ${cat.title}`);

      // create questions first
      const questions = await Question.insertMany(
        (cat.ques || []).map((q) => ({
          title: q.title,
          yt_link: q.yt_link,
          p1_link: q.p1_link,
          p2_link: q.p2_link,
          tags: q.tags ? q.tags.split(",").map((t) => t.trim()) : [],
        }))
      );

      // create category with question refs
      const newCat = new Category({
        title: cat.title,
        ques: questions.map((q) => q._id),
      });

      await newCat.save();
      console.log(`   ✅ Saved category: ${newCat.title}`);
    }

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error while seeding:", err.message);
    process.exit(1);
  }
}

seedDB();

