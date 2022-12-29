const fs = require("fs");
const config = require("../config/config.js");
const util = require("./util.js");

const checkRootPath = () => {
  try {
    const filePathList = [config.path["www"], config.path["www/index.html"]];
    filePathList.forEach((value) => {
      if (fs.existsSync(`./${value}`) === false) {
        throw { message: "You are not in the project root path" };
      }
    });
  } catch (e) {
    throw e;
  }
};

const checkNoCachebusting = () => {
  try {
    if (fs.existsSync(`./${config.path["www/version"]}`) === false) {
      throw {
        message:
          "Enter the frontle build -r command to revert to the state before cache busting",
      };
    }
  } catch (e) {
    throw e;
  }
};

const getPackageJsonData = (path = `./${config.path["package.json"]}`) => {
  try {
    // Check if the package.json file exists
    if (!fs.existsSync(path)) {
      throw {
        message: `${path} doesn\'t exist`,
      };
    }

    // Read package.json file
    let packageJson = JSON.parse(fs.readFileSync(path).toString());
    if (packageJson.dependencies === undefined) packageJson.dependencies = {};
    if (packageJson.frontle === undefined) packageJson.frontle = {};
    if (packageJson.frontle.dependencies === undefined) {
      packageJson.frontle.dependencies = {};
    }

    return packageJson;
  } catch (e) {
    throw e;
  }
};

const setPackageJsonData = (
  data,
  path = `./${config.path["package.json"]}`
) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (e) {
    throw e;
  }
};

const isDir = (path) => {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (e) {
    return false;
  }
};

const set_frontle_env_FRONTLE_ENV = (value) => {
  if (value !== "null") {
    value = `"${value}"`;
  }

  util.ReplaceFileRowToIdentifier(
    config.path["www/version/@/browser_modules/@frontle/frontle-core/index.js"],
    "#FRONTLE_BUILD_LINE: FRONTLE_ENV",
    `/* #FRONTLE_BUILD_LINE: FRONTLE_ENV */ FRONTLE_ENV: ${value},`
  );
};

const set_frontle_env_version = (value) => {
  util.ReplaceFileRowToIdentifier(
    config.path["www/version/@/browser_modules/@frontle/frontle-core/index.js"],
    "#FRONTLE_BUILD_LINE: version",
    `/* #FRONTLE_BUILD_LINE: version */ version: "${value}",`
  );
};

module.exports = {
  set_frontle_env_FRONTLE_ENV,
  set_frontle_env_version,
  checkRootPath,
  checkNoCachebusting,
  getPackageJsonData,
  setPackageJsonData,
  isDir,
};
