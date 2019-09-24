exports.getPost = (req, res, next) => {
  res.send("get post");
};

exports.getPosts = (req, res, next) => {
  res.send("get multiple posts");
};

exports.addPost = (req, res, next) => {
  res.send("add post");
};

exports.deletePost = (req, res, next) => {
  res.send("delete post");
};

exports.updatePost = (req, res, next) => {
  res.send("update post");
};

exports.searchPosts = (req, res, next) => {
  res.send("searching posts");
};
