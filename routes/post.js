const express = require("express");
const router = express.Router();
const {
  addPost,
  deletePost,
  getPost,
  getPosts,
  searchPosts,
  updatePost
} = require("../controllers/post");

//Get single post by id
router.get("/post/:id", getPost);

//Get multiple post
router.get("/posts/:page", getPosts);

//add post
router.post("/post", addPost);

//delete post by id
router.delete("/post/:id", deletePost);

//update post by id
router.patch("/post/:id", updatePost);

//search posts by search query
router.get("/search", searchPosts);
module.exports = router;
