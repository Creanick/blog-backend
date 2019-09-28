const express = require("express");
const bodyParser = require("body-parser");
const postRouter = require("./routes/post");
const BlogError = require("./utils/BlogError");
const devRun = require("./utils/devRun");
const ErrorMessages = require("./ErrorMessages");
const app = express();
app.use(bodyParser.json());
app.use(postRouter);
app.use((req, res, next) => {
  res.status(404).send(ErrorMessages.notFound);
});

app.use((err, req, res, next) => {
  devRun(() => {
    console.log("Error: ", err.message);
  });
  const errorMessage =
    err instanceof BlogError ? err.message : ErrorMessages.default;
  res.status(err.status || 500).send({
    error: true,
    message: errorMessage
  });
});
module.exports = app;
