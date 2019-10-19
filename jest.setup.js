const mongoose = require("mongoose");
const Post = require("./models/post");
beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});
afterAll(async () => {
  await Post.deleteMany({});
  mongoose.connection.close();
});
