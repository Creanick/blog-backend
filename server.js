const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 5000;
const dbUrl =
  "mongodb+srv://guest:MUvoUv4dA5v678SN@cluster0-2hvb3.mongodb.net/blog_backend_db?retryWrites=true&w=majority";
app.listen(port, () => {
  console.log("server running at %d", port);
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database Successfully connected");
    })
    .catch(err => {
      console.log("Database Connection Error: ", err.message);
      process.exit();
    });
});
