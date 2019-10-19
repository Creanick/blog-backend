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
const postIdValidation = require("../middlewares/postIdValidation");
const postBodyValidation = require("../middlewares/postBodyValidation");
const queryValidation = require("../middlewares/multiplePostsQuery");
//Get single post by id
router.get("/post/:id", postIdValidation, getPost);

//Get multiple post
router.get("/posts", queryValidation, getPosts);

//add post
router.post("/post", postBodyValidation, addPost);

//delete post by id
router.delete("/post/:id", deletePost);

//update post by id
router.patch("/post/:id", updatePost);

//search posts by search query
router.get("/search", searchPosts);
module.exports = router;
