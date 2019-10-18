const mongoose = require("mongoose");
const app = require("./app");
const { port, dbUrl, dbName } = require("./server.config");

app.listen(port, () => {
  console.log("server running at %d", port);
  mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Database: ${dbName} Successfully connected`);
    })
    .catch(err => {
      console.log("Database Connection Error: ", err.message);
      process.exit();
    });
});
