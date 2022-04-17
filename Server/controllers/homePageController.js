var connection = require('../config/dataBase')
var blogList = connection.models.Blog;

const home = (req, res) => {
  blogList.find({}, async (e, f) => {
    res.json(f);
  });
}

module.exports = home;