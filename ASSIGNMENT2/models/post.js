const mongooose = require('mongoose');
const Schema=mongooose.Schema;
const ObjectId=Schema.ObjectId;

const postSchema = new mongooose.Schema({
    // Your code goes here
    title:{type:String, required:true},
    body:String,
    image:String,
    user:{type:ObjectId,ref:'User'}
})

const Post = mongooose.model('post', postSchema);

module.exports = Post;