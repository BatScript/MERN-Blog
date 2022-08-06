var passport = require("passport");
var connection = require("../config/dataBase");
var User = connection.models.User;

const signUp = (req, res) => {
  User.register(
    {
      username: req.body.username,
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        passport.authenticate("local")(req, res, (err, usr, info) => {
          if (!err) {
            res.json({
              authenticated: true,
              status: {
                message: "Successfully Signed up and authenticated",
                code: 200,
              },
            });
          } else {
            res.json({
              authenticated: false,
              status: {
                message: "Something went wrong!",
                code: 500,
              },
            });
          }
        });
      }
    }
  );
};

module.exports = signUp;
