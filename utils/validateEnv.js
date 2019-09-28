function validateEnv(...variables) {
  for (let vars of variables) {
    if (!vars || typeof vars !== "string") {
      return false;
    }
  }
  return true;
}

module.exports = validateEnv;
