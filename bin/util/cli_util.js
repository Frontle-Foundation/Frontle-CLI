const fs = require("fs");
const config = require("../config/config.js");

// Check if the current path is the project root path
const checkRootPath = (checkVersionOriginal = true) => {
  try {
    // List of files that must exist in the project root path
    let filePathList = [config.path["www"], config.path["www/index.html"]];
    if (checkVersionOriginal === true) {
      filePathList.push(config.path["www/version"]);
    }

    // Check if file paths exist
    filePathList.forEach((value) => {
      if (fs.existsSync(`./${value}`) === false) {
        throw { message: "You are not in the project root path" };
      }
    });
  } catch (e) {
    throw e;
  }
};

// Get package.json data
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

// Set package.json data
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

// Whether the path is a folder
const isDir = (path) => {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (e) {
    return false;
  }
};

module.exports = {
  checkRootPath,
  getPackageJsonData,
  setPackageJsonData,
  isDir,
};
