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
    const result = await Post.findByIdAndDelete(req.postId);
    if (!result) {
      return next(new BlogError(ErrorMessages.postNotFound, 404));
    }
    res.status(200).send(postResultify(result));
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.postId);
    if (!post) {
      return next(new BlogError(ErrorMessages.postNotFound, 404));
    }
    const properties = ["title", "content", "author"];
    for (let key of properties) {
      if (key in req.body) {
        post[key] = req.body[key];
      }
    }
    const result = await post.save();
    res.status(200).send(postResultify(result));
  } catch (err) {
    next(err);
  }
};

exports.searchPosts = (req, res, next) => {
  res.send("searching posts");
};
