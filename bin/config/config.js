const packageJson = require("../../package.json");
const config = {};
config.packageName = packageJson.name;
config.packageVersion = packageJson.version;
config.packageDescription = packageJson.description;
config.projectName = "Frontle";

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

  // cli
  "cli/frontle_core": `${__dirname}/../../frontle_core`,
  "cli/frontle_core/Frontle": `${__dirname}/../../frontle_core/Frontle`,
  "cli/frontle_core/FrontleGit": `${__dirname}/../../frontle_core/FrontleGit`,
};

module.exports = config;
