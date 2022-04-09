var express = require('express');
var blogList = require('../models/createBlog');
var router = express.Router();

router.get('/:cat', (req, res) => {
    const cat = req.params.cat;
    blogList.find({ category: cat }, (e, f) => {
        res.json(f);
    })
})


module.exports = router;