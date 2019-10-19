const { query, validationResult } = require("express-validator");
const BlogError = require("../utils/BlogError");
module.exports = [
  query("limit", "limit should be a positive numeric value")
    .optional()
    .isNumeric()
    .custom((value, { req }) => {
      const limit = parseInt(value);
      if (limit < 1) {
        throw new Error("limit should be a positive numeric value");
      }
      req.limit = limit;
      return true;
    }),
  query("skip", "skip should be a positive numeric value")
    .optional()
    .isNumeric()
    .custom((value, { req }) => {
      const skip = parseInt(value);
      if (skip < 0) {
        throw new Error("skip should be a positive numeric value");
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
