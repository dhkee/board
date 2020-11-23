var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

// Index
router.get('/', function(req, res){
    Post.find({})                   // 나중에 생성된 data가 위로 오도록 정렬
    .sort('-createdAt')
    .exec(function(err, posts){
        if(err) return res.json(err);
        res.render('posts/index', {posts : posts});
    });
});

// New
router.get('/new', function(req, res){
    res.render('posts/new');
});

// Create
router.post('/', function(req, res){
    Post.create(req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect('/posts');
    });
});

// Show
router.get('/:id', function(req, res){
    Post.findOne({_id : req.params.id}, function(err, post){
        if(err) return res.json(err);
        res.render('posts/show', {post : post});
    });
});

// Edit
router.get('/:id/edit', function(req, res){
    Post.findOne({_id : req.params.id}, function(err, post){
        if(err) return res.json(err);
        res.render('posts/edit', {post : post});
    });
});

// Update
router.post('/:id/update', function(req, res){
    req.body.updatedAt = Date.now();    // post를 수정하는 경우 수정된 날짜를 updatedAt에 기록
    Post.findOneAndUpdate({_id : req.params.id}, req.body, function(err, post){
        if(err) return res.json(err);
        res.redirect('/posts/' + req.params.id);
    });
});

// Destroy
router.post('/:id/delete', function(req, res){
    Post.deleteOne({_id : req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect('/posts');
    });
});

module.exports = router;