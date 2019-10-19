const request = require("supertest");
const app = require("../../app");
const ErrorMessages = require("../../ErrorMessages");
//wrong id delete
//add post then delete then check with get post;

describe("DELETE /post/:id", () => {
  it("should not delete for non id deletion", async () => {
    const res = await request(app).delete("/post/5d8c92d596da330ffc3e3f50");
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message).toBe(ErrorMessages.postNotFound);
  });
  it("should delete and return post", async () => {
    const data = { title: "main title", content: "main content" };
    const { body: postResult } = await request(app)
      .post("/post")
      .send(data);
    const deletedRes = await request(app).delete("/post/" + postResult.id);
    expect(deletedRes.status).toBe(200);
    expect(deletedRes.body).toEqual(postResult);
    const getRes = await request(app).get("/post/" + postResult.id);
    expect(getRes.status).toBe(404);
    expect(getRes.body.error).toBeTruthy();
  });
});
