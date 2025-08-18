const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  yt_link: { type: String },
  p1_link: { type: String },
  p2_link: { type: String },
  tags: [{ type: String }]
});

module.exports = mongoose.model("Question", questionSchema);