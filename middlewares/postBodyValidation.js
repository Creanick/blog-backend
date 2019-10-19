const { body, validationResult, sanitizeBody } = require("express-validator");
const BlogError = require("../utils/BlogError");
const ErrorMessages = require("../ErrorMessages");
module.exports = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage(ErrorMessages.title)
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage(ErrorMessages.content)
    .escape(),
  body("author")
    .optional()
    .trim()
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
