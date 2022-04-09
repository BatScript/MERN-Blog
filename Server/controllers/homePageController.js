var blogList = require('../models/createBlog');

const home = (req, res) => {
  blogList.find({}, async (e, f) => {
    res.json(f);
  });
}

module.exports = home;