const request = require("supertest");
const app = require("../../app");
const ErrorMessages = require("../../ErrorMessages");
const settings = require("../../settings");

describe("GET /post/:id route testing", () => {
  it("should not found any post", async () => {
    const res = await request(app).get("/post/" + "5da962ebf81cab08de7f164b");
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toBe(ErrorMessages.postNotFound);
  });
  it("should found a post", async () => {
    const data = {
      title: "this is title",
      content: "this is content",
      author: "grant"
    };
    const { body } = await request(app)
      .post("/post")
      .send(data);
    const res = await request(app).get("/post/" + body.id);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(body);
  });
});
