const postResultify = require("../../utils/postResultify/postResultify");

it("check post resultify ka kamal", () => {
  const result = {
    _id: "3423",
    title: "dafefdf  faf af afd",
    content: "asf adsf adf afd a",
    name: "dafe af ea a",
    _v: "3asdf",
    createdDate: Date.now(),
    age: "3432343",
    author: "manick alal "
  };
  expect(postResultify(result)).toEqual({
    id: result._id,
    title: result.title,
    content: result.content,
    createdDate: result.createdDate,
    author: result.author
  });
});
