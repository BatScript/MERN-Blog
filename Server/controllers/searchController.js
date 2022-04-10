var express = require('express');
var router = express.Router();

var blogList = require('../models/createBlog');

router.get('/:keyword', async (req, res) => {
    var keyword = req.params.keyword;
    keyword = keyword.toLowerCase();
    var data = [];
    var resData = []

    await blogList.find({}).then((f) => {
        data = f;
    })

    data.forEach((val) => {
        if (val.title.toLowerCase().includes(keyword)) {
            resData.push(val);
        }
    })
    res.json(resData);
})

module.exports = router;