const BlogError = require("../utils/BlogError");
const ObjectId = require("mongoose").Types.ObjectId;
const ErrorMessages = require("../ErrorMessages");
module.exports = (req, res, next) => {
  const postId = req.params.id;
  const isIdValid = ObjectId.isValid(postId);
  if (!isIdValid) {
    return next(new BlogError(ErrorMessages.invalidId, 400));
  }
  req.postId = postId;
  next();
};
