const request = require("supertest");
const app = require("../../app");
const ErrorMessages = require("../../ErrorMessages");
const settings = require("../../settings");
describe("POST /post add post route testing", () => {
  let body = null;
  it("add post with invalid title", async () => {
    body = {
      title: "man",
      content: "My name is Manick"
    };
    const res = await request(app)
      .post("/post")
      .send(body);
    expect(res.status).toBe(422);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message[0].msg).toBe(ErrorMessages.title);
  });
  it("add post with invalid content", async () => {
    body = {
      title: "manick lal jamadar",
      content: "er"
    };
    const res = await request(app)
      .post("/post")
      .send(body);
    expect(res.status).toBe(422);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message[0].msg).toBe(ErrorMessages.content);
  });
  it("add post with invalid title and content", async () => {
    body = {
      title: "",
      content: "er"
    };
    const res = await request(app)
      .post("/post")
      .send(body);
    expect(res.status).toBe(422);
    expect(res.body.error).toBeTruthy();
    expect(res.body.message[0].msg).toBe(ErrorMessages.title);
    expect(res.body.message[1].msg).toBe(ErrorMessages.content);
  });
  it("return normal created post with default author", async () => {
    body = {
      title: "about us",
      content: "My name is manick lal jamadar"
    };
    const res = await request(app)
      .post("/post")
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body.error).toBeUndefined();
    expect(res.body.id).toBeDefined();
    expect(res.body).toMatchObject(body);
    expect(res.body.author).toBe(settings.defaultAuthor);
  });
  it("return normal created post with defined author", async () => {
    body = {
      title: "about us",
      content: "My name is manick lal jamadar",
      author: "Jacky Chan"
    };
    const res = await request(app)
      .post("/post")
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body.error).toBeUndefined();
    expect(res.body.id).toBeDefined();
    expect(res.body).toMatchObject(body);
  });
  it("should escape html strings", async () => {
    body = {
      title: "About <span>Us</span>",
      content: "My name is <b>manick<b> lal jamadar",
      author: "Jacky <i>Chan<i>"
    };
    const res = await request(app)
      .post("/post")
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body.error).toBeUndefined();
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("About &lt;span&gt;Us&lt;&#x2F;span&gt;");
    expect(res.body.content).toBe(
      "My name is &lt;b&gt;manick&lt;b&gt; lal jamadar"
    );
    expect(res.body.author).toBe("Jacky &lt;i&gt;Chan&lt;i&gt;");
  });
});
