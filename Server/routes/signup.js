var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController').RegisterUser;

/* GET home page. */
router.post("/", userController);

module.exports = router;
