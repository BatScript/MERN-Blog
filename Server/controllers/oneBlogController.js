var express = require('express');
var router = express.Router();
var blogList = require('../models/createBlog');

router.get('/:id', (req, res) => {
    blogList.findOne({_id: req.params.id}, (e, f) => {
        res.json(f);
    })
})

module.exports = router;