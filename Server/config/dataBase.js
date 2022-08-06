const mongoose = require('mongoose');
var session = require('express-session');
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
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

const userSchema = new Schema({
  username: String,
  password: String,
  data: {
    firstName: String,
    lastName: String,
    likedPosts: [String]
  }
})

userSchema.plugin(passportLocalMongoose); //Used to hash and salt the passwords & save our users in mongodb

const Blog = connection.model("Blog", blogSchema);
const User = connection.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = connection;