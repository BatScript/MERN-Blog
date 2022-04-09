var blogList = require('../models/createBlog');

const submitPost = (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let tags = req.body.tags;
    let category = req.body.category;

    var data = {};
    data.title = title.toLowerCase();
    data.content = content.toLowerCase();
    data.author = author.toLowerCase();
    data.tags = [tags.toLowerCase()];
    data.category = category.toLowerCase();

    var blog = new blogList(data);
    blog.save();
    res.redirect("/blogList");
    // console.log(title, content);
}

module.exports = submitPost;