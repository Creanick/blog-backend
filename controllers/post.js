const Post = require("../models/post");
const mongoose = require("mongoose");
const postResultify = require("../utils/postResultify");
const ObjectId = mongoose.Types.ObjectId;
const BlogError = require("../utils/BlogError");
const ErrorMessages = require("../ErrorMessages");
const { defaultAuthor } = require("../settings");
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(ObjectId(req.postId));
    if (!post) {
      return next(new BlogError(ErrorMessages.postNotFound, 404));
    }
    res.send(postResultify(post));
  } catch (err) {
    next(err);
  }
};

exports.getPosts = (req, res, next) => {
  res.send("get multiple posts");
};

exports.addPost = async (req, res, next) => {
  const { title, content, author = defaultAuthor } = req.body;
  const post = new Post({
    _id: ObjectId(),
    title,
    content,
    author
  });
  try {
    const result = await post.save();
    res.send(postResultify(result));
  } catch (err) {
    next(err);
  }
};

exports.deletePost = (req, res, next) => {
  res.send("delete post");
};

exports.updatePost = (req, res, next) => {
  res.send("update post");
};

exports.searchPosts = (req, res, next) => {
  res.send("searching posts");
};
