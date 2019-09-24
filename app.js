const express = require("express");
const bodyParser = require("body-parser");
const postRouter = require("./routes/post");
const BlogError = require("./utils/BlogError");
const devRun = require("./utils/devRun");
const app = express();
app.use(bodyParser.json());
app.use(postRouter);
app.use((req, res, next) => {
  res.status(404).send("api not found");
});

app.use((err, req, res, next) => {
  devRun(() => {
    console.log("Error: ", err.message);
  });
  res
    .status(err.status || 500)
    .send(err instanceof BlogError ? err.message : "Something went wrong");
});
module.exports = app;
