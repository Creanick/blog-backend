const Post = require("../models/post");
const BlogError = require("../utils/BlogError");
const ErrorMessages = require("../ErrorMessages");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = async (req, res, next) => {
  try {
    const post = await Post.findById(ObjectId(req.postId));
    if (!post) {
      return next(new BlogError(ErrorMessages.postNotFound, 404));
    }
    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
};
