var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");
var homePage = require("./controllers/homePageController");
var categoryFilter = require("./controllers/blogCategoryController");
var submitBlog = require("./controllers/submitBlogController");
var search = require("./controllers/searchController");
var oneBlog = require("./controllers/oneBlogController");
var signupController = require("./controllers/signupController");
var loginController = require("./controllers/loginController");
var loginStateController = require("./controllers/loginStateController");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Passport session management config snippet started

app.use(
  session({
    secret: "potato supermacy",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport session management config snippet ended

// app.use("/users", usersRouter);

app.post("/submit", submitBlog);

app.get("/blogList", homePage);

app.use("/category", categoryFilter);

app.use("/find", search);

app.use("/oneBlog", oneBlog);

app.post("/login", loginController);

app.post("/signup", signupController);

app.get("/loginState", loginStateController);

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
