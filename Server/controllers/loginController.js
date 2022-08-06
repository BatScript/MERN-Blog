var passport = require("passport");
var connection = require("../config/dataBase");
var User = connection.models.User;

const Login = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (!err) {
      passport.authenticate("local")(req, res, function () {
        res.json({
          authenticated: true,
          status: {
            message: "Successfully logged in",
            code: 200,
          },
        });
      });
    } else {
      res.json({
        authenticated: false,
        status: {
          message: "Something went wrong",
          code: 500,
        },
      });
    }
  });
};

module.exports = Login;
