const express = require("express");
const postRouter = require("./routes/post");
const BlogError = require("./utils/BlogError");
const app = express();
app.use(postRouter);
app.use((req, res, next) => {
  res.status(404).send("api not found");
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err instanceof BlogError ? err.message : "Something went wrong");
});
module.exports = app;
