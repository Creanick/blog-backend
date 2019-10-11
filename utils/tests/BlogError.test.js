const BlogError = require("../BlogError");
const ErrorMessages = require("../../ErrorMessages");
it("should form correctly without message and status", () => {
  const err = new BlogError();

  expect(err instanceof BlogError).toBeTruthy();

  expect(err.message).toBe(ErrorMessages.default);
  expect(err.status).toBe(500);
});

it("should form correctly with proper message and status", () => {
  const message = "How are you";
  const status = 404;
  const err = new BlogError(message, status);

  expect(err.name).toBe("BlogError");
  expect(err.message).toBe(message);
  expect(err.status).toBe(status);
});
