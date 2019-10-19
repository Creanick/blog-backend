const request = require("supertest");
const app = require("../../app");
const ErrorMessages = require("../../ErrorMessages");
const Post = require("../../models/post");
const ObjectId = require("mongoose").Types.ObjectId;
const settings = require("../../settings");

function generateData(size) {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({
      _id: ObjectId(),
      title: "title" + i,
      content: "content" + i
    });
  }
  return data;
}
describe("GET /posts?limit&skip route testing", () => {
  describe("for empty databases", () => {
    it("should not found posts", async () => {
      const res = await request(app).get("/posts");
      expect(res.status).toBe(404);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message).toBe(ErrorMessages.postNotFound);
    });
  });
  describe("tests with lots of posts", () => {
    let testData = [];
    beforeAll(async () => {
      const data = generateData(10);
      testData = await Post.insertMany(data);
    });
    it("get post with default limit", async () => {
      const res = await request(app).get("/posts");
      expect(res.status).toBe(200);
      const results = res.body;
      expect(results.length).toBe(settings.defaultLimit);
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const testResult = testData[i];
        expect(String(result.id)).toBe(String(testResult._id));
        expect(result.title).toBe(testResult.title);
        expect(result.content).toBe(testResult.content);
      }
    });
    it("get post with limit", async () => {
      const res = await request(app).get("/posts?limit=3");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
    });
    it("get post with skip", async () => {
      const res = await request(app).get("/posts?skip=3");
      expect(res.status).toBe(200);
      expect(res.body[0].title).toBe("title3");
      expect(res.body[0].content).toBe("content3");
    });
    it("get post with wrong limit", async () => {
      const res = await request(app).get("/posts?limit=-3");
      expect(res.status).toBe(422);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].msg).toBe(ErrorMessages.limit);
    });
    it("get post with wrong skip", async () => {
      const res = await request(app).get("/posts?skip=sfa");
      expect(res.status).toBe(422);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].msg).toBe(ErrorMessages.skip);
    });
    it("get post with wrong skip and limit", async () => {
      const res = await request(app).get("/posts?skip=-2&limit=0");
      expect(res.status).toBe(422);
      expect(res.body.error).toBeTruthy();
      expect(res.body.message[0].msg).toBe(ErrorMessages.limit);
      expect(res.body.message[1].msg).toBe(ErrorMessages.skip);
    });
    afterAll(async () => {
      await Post.deleteMany({});
    });
  });
});
