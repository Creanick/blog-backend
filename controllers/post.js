const Post = require("../models/post");
const mongoose = require("mongoose");
const postResultify = require("../utils/postResultify");
const ObjectId = mongoose.Types.ObjectId;
const BlogError = require("../utils/BlogError");
const ErrorMessages = require("../ErrorMessages");
const settings = require("../settings");
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

exports.getPosts = async (req, res, next) => {
  const { limit = settings.defaultLimit, skip = 0 } = req;
  try {
    const posts = await Post.find({})
      .limit(limit)
      .skip(skip);
    if (!posts || !Array.isArray(posts) || posts.length < 1) {
      return next(new BlogError(ErrorMessages.postNotFound, 404));
    }
    res.send(postResultify(posts));
  } catch (err) {
    next(err);
  }
};

exports.addPost = async (req, res, next) => {
  const { title, content, author = settings.defaultAuthor } = req.body;
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

exports.deletePost = async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: ObjectId(req.postId) });
    res.send({
      message: "Post Deleted Successfully"
    });
  } catch (err) {}
};

exports.updatePost = (req, res, next) => {
  res.send("update post");
};

exports.searchPosts = (req, res, next) => {
  res.send("searching posts");
};
