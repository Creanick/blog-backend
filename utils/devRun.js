module.exports = func => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof func === "function") {
      func();
    }
  }
};
