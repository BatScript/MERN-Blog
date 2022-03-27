var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
//mongodb+srv://bibilo:<password>@cluster0.9mefx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://bibilo:mzZo0_299@cluster0.9mefx.mongodb.net/Blogs?retryWrites=true&w=majority"
);

const { Schema } = mongoose;

const blogSchema = new Schema({
  img: String,
  title: String,
  content: String,
  tags: [String],
});

const newBlog = mongoose.model("Blogs", blogSchema);
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

app.get("/create", cors(), (req, res) => {
  res.send("here, its working now");
});

var dataArray = [
  {
    title: "Default",
    content: "Lorem impsum yea dolor y",
  },
];

app.post("/submit", async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  var data = {};
  data.title = title;
  data.content = content;
  dataArray.push(data);

  var blog = new newBlog(data);
  blog.save();
  res.redirect("/blogList");
  // console.log(title, content);
});

app.get("/blogList", (req, res) => {
  newBlog.find({}, async (e, f) => {
    console.log(f);
    res.json(f);
  });
  
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
