const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(() => {
  mongoose.connection.close();
});
