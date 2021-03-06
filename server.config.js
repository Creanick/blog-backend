const path = require("path");
const validateEnv = require("./utils/validateEnv");
const settings = require("./settings");
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: path.join(__dirname, ".env.development") });
}
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: path.join(__dirname, ".env.test") });
}
const port = process.env.PORT || settings.defaultPort;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
if (!validateEnv(dbName, dbUser, dbPassword)) {
  throw new Error("environment variable missing");
}

module.exports = {
  port,
  dbName,
  dbUser,
  dbPassword,
  dbUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-2hvb3.mongodb.net/${dbName}?retryWrites=true&w=majority`
};
