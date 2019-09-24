class BlogError extends Error {
  constructor(message = "Something went wrong", status = 500) {
    super(message);
    this.status = status;
    this.name = "BlogError";
  }
}

module.exports = BlogError;
