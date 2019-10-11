const devRun = require("../devRun");

let nodeEnv = null;

beforeAll(() => {
  nodeEnv = process.env.NODE_ENV;
});

afterAll(() => {
  process.env.NODE_ENV = nodeEnv;
});

it("test in production environment", () => {
  const mock = jest.fn();
  process.env.NODE_ENV = "production";
  devRun(mock);
  expect(mock).not.toHaveBeenCalled();
});
it("test in test environment", () => {
  const mock = jest.fn();
  process.env.NODE_ENV = "test";
  devRun(mock);
  expect(mock).toHaveBeenCalled();
});
it("test in development environment", () => {
  const mock = jest.fn();
  process.env.NODE_ENV = "development";
  devRun(mock);
  expect(mock).toHaveBeenCalled();
});
it("test in development environment with wrong argument", () => {
  const mock = "manick";
  process.env.NODE_ENV = "development";
  expect(() => devRun(mock)).not.toThrow();
});
