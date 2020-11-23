var mongoose = require('mongoose');

// schema
var postSchema = mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    createdAt : {type : Date, default : Date.now},  // 기본값 지정 (현재 시간)
    updatedAt : {type : Date}
});

// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;