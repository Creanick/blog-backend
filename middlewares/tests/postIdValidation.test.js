const postIdValidation = require("../postIdValidation");
const ObjectId = require("mongoose").Types.ObjectId;
const BlogError = require("../../utils/BlogError");
const ErrorMessages = require("../../ErrorMessages");
describe("Post Id Validation middleware testing", () => {
  it("should pass postId to next middleware", () => {
    const req = {
      params: {
        id: ObjectId()
      }
    };
    const next = jest.fn();
    postIdValidation(req, null, next);
    expect(req.postId).toBe(req.params.id);
    expect(next).toHaveBeenCalled();
  });
  it("should pass blog error object for wrong req id", () => {
    const req = {
      params: {
        id: "dsafdadfas"
      }
    };
    const next = jest.fn();
    postIdValidation(req, null, next);
    expect(req.postId).toBeUndefined();
    expect(next).toHaveBeenCalledWith(
      new BlogError(ErrorMessages.invalidId, 400)
    );
  });
});
