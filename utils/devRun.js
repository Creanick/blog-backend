module.exports = func => {
  if (process.NODE_ENV !== "production") {
    if (typeof func === "function") {
      func();
    }
  }
};
