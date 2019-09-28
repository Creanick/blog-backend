const request = require("supertest");
const app = require("../../app");

describe("not found routes test", () => {
  it("get /not-found", async done => {
    const res = await request(app).get("/not-found");
    expect(res.status).toBe(404);
    expect(res.text).toBe("api not found");
    done();
  });
});
