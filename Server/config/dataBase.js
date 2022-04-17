const mongoose = require('mongoose');
var dotenv = require('dotenv');


const Schema = mongoose.Schema;

const connection = mongoose.createConnection(
  "mongodb+srv://bibilo:mzZo0_299@cluster0.9mefx.mongodb.net/Blogs?retryWrites=true&w=majority"
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const blogSchema = new Schema({
  img: String,
  title: String,
  content: String,
  tags: [String],
  category: String,
  author: String
});

const userSchema = new Schema ({
  firstName: String,
  lastName: String,
  email : String,
  username : String,
  password: String,
  likedPosts : [String]
})

const Blog = connection.model("Blog", blogSchema);
const User = connection.model("USER", userSchema);
module.exports = connection;