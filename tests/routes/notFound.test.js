const request = require("supertest");
const app = require("../../app");
const ErrorMessages = require("../../ErrorMessages");
describe("not found routes test", () => {
  it("get /not-found", async done => {
    const res = await request(app).get("/not-found");
    expect(res.status).toBe(404);
    expect(res.text).toBe(ErrorMessages.notFound);
    done();
  });
});
