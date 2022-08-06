var passport = require("passport");
var connection = require("../config/dataBase");
var User = connection.models.User;

const loginState = (req, res) => {
  if (req.user) {
    return res.json({
      loggedIn: true,
    });
  } else {
    return res.json({
      loggedIn: false,
    });
  }
};

module.exports = loginState;
