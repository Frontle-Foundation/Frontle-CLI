const packageJson = require("../../package.json");
const config = {};
config.packageName = packageJson.name;
config.packageVersion = packageJson.version;
config.packageDescription = packageJson.description;
config.projectName = "Frontle";
config.projectReleaseTag = "v1.0.7";

config.path = {
  // root
  www: "www",
  ".frontle": ".frontle",
  cli: `${__dirname}/../..`,

  // root etc
  node_modules: "node_modules",
  "package.json": "package.json",
  "package-lock.json": "package-lock.json",

  // www
  "www/index.html": "www/index.html",
  "www/version": "www/version",
  "www/version/@/browser_modules": "www/version/@/browser_modules",
  "www/version/@/browser_modules/@frontle/frontle-core/index.js":
    "www/version/@/browser_modules/@frontle/frontle-core/index.js",
};

module.exports = config;
