const { query, validationResult } = require("express-validator");
const BlogError = require("../utils/BlogError");
const ErrorMessages = require("../ErrorMessages");
module.exports = [
  query("q")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Query value must present"),
  (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    next(new BlogError(error.array(), 422));
  }
];
