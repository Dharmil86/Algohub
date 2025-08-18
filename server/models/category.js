const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: String, required: true },
  ques: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ]
});

module.exports = mongoose.model("Category", categorySchema);
