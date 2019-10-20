const request = require("supertest");
const app = require("../../app");
//update title and content
//update title and content and age
let testPost = null;
let testData = {
  title: "test title",
  content: "test content",
  author: "test author"
};
beforeAll(async () => {
  const res = await request(app)
    .post("/post")
    .send(testData);
  testPost = res.body;
});
describe("PATCH /post/:id", () => {
  it("should update title only", async () => {
    const updateData = {
      title: "update title",
      age: 34
    };
    const res = await request(app)
      .patch("/post/" + testPost.id)
      .send(updateData);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updateData.title);
    expect(res.body.content).toBe(testData.content);
  });
  it("should change all", async () => {
    const updateData = {
      title: "second title",
      content: "second content",
      author: "second author"
    };
    const res = await request(app)
      .patch("/post/" + testPost.id)
      .send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(updateData);
  });
});
