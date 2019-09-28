const validateEnv = require("../../utils/validateEnv");

describe("validate env variables", () => {
  it("should be false for empty vars", () => {
    expect(validateEnv("", "manick")).toBeFalsy();
  });
  it("should not expect number", () => {
    expect(validateEnv(34, "daf", 345)).toBeFalsy();
  });
  it("should not expect null", () => {
    expect(validateEnv(null, null)).toBeFalsy();
  });
  it("should not expect undefined", () => {
    expect(validateEnv(undefined, undefined)).toBeFalsy();
  });
  it("should true for only string non empty vars", () => {
    expect(validateEnv("manick", "lal", "jamadar", "3000")).toBeTruthy();
  });
});
