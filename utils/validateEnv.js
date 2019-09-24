function validateEnv(...variables) {
  for (let vars of variables) {
    if (vars === "undefined" || typeof vars !== "string" || vars.length === 0) {
      return false;
    }
  }
  return true;
}

module.exports = validateEnv;
