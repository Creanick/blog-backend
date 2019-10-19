const { query, validationResult } = require("express-validator");
const BlogError = require("../utils/BlogError");
const ErrorMessages = require("../ErrorMessages");
module.exports = [
  query("limit", ErrorMessages.limit)
    .optional()
    .isNumeric()
    .custom((value, { req }) => {
      const limit = parseInt(value);
      if (limit < 1) {
        throw new Error(ErrorMessages.limit);
      }
      req.limit = limit;
      return true;
    }),
  query("skip", ErrorMessages.skip)
    .optional()
    .isNumeric()
    .custom((value, { req }) => {
      const skip = parseInt(value);
      if (skip < 0) {
        throw new Error(ErrorMessages.skip);
      }
      req.skip = skip;
      return true;
    }),
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    next(new BlogError(error.array(), 422));
  }
];
