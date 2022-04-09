const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  img: String,
  title: String,
  content: String,
  tags: [String],
  category: String,
  author: String
});

const blogList = mongoose.model("Blog", blogSchema);

module.exports = blogList;