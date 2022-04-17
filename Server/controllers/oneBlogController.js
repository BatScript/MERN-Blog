var express = require('express');
var router = express.Router();
var connection = require('../config/dataBase')
var blogList = connection.models.Blog;

router.get('/:id', (req, res) => {
    blogList.findOne({_id: req.params.id}, (e, f) => {
        res.json(f);
    })
})

module.exports = router;