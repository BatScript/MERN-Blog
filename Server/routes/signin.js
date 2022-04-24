var express = require("express");
var router = express.Router();
var loginController =  require('../controllers/userController').LoginUser;

console.log('here?');
router.post("/", loginController);

module.exports = router;
