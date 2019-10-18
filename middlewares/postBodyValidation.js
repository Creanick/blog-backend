const { body, validationResult } = require("express-validator");
const BlogError = require("../utils/BlogError");
module.exports = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("title must have more than 5 length")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("content must have more than 5 length")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = errors.array();
      next(new BlogError(errorObject, 422));
    }
    next();
  }
];
