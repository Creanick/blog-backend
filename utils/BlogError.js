const ErrorMessages = require("../ErrorMessages");
class BlogError extends Error {
  constructor(message = ErrorMessages.default, status = 500) {
    super(message);
    this.status = status;
    this.name = "BlogError";
  }
}

module.exports = BlogError;
