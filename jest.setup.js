const mongoose = require("mongoose");
const Post = require("./models/post");
beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});
beforeEach(async () => {
  await Post.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
});
