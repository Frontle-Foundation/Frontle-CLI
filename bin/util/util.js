const colors = require("colors");
const fs = require("fs");
colors.enable();

const IsConsistOnlyEngNumUnderBar = (str) => {
  return /^[_A-Za-z0-9]*$/.test(str);
};
const ToHex = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
};
const Timestamp = () => {
  return String(new Date().getTime());
};
const IsNPMPackageName = (str) => {
  return /@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*)/g.test(str);
};
const getNPMPackageInfo = (NPMPackageFullName) => {
  const array = NPMPackageFullName.split(
    /@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*)/g
  );

  const packageName = array[0] || "";
  const packageVersion = array[1] || "";
  const packageFullName =
    packageVersion === "" ? packageName : `${packageName}@${packageVersion}`;

  return {
    packageName: packageName,
    packageVersion: packageVersion,
    packageFullName: packageFullName,
  };
};
const ReplaceFileRowToIdentifier = (filePath, identifier, data) => {
  try {
    // Read file
    let fileData = fs.readFileSync(filePath, "utf8");

    // Check if read data exists
    if (fileData === undefined || fileData === null || fileData === "") {
      throw { message: `${filePath} doesn\'t exist` };
    }

    // Split by row
    const rows = fileData.split("\n");

    // Replace row
    let result = "";
    rows.forEach((row) => {
      row = String(row);
      if (row.indexOf(identifier) !== -1) row = data;
      result += `${row}\n`;
    });

    // Save file
    fs.writeFileSync(filePath, result);
  } catch (e) {
    throw e;
  }
};

// console log
const consoleLogData = (str) => {
  console.log(str);
};
const consoleLogInfo = (str) => {
  console.log(colors.green(str));
};
const consoleLogHelp = (str) => {
  console.log(colors.cyan(str));
};
const consoleLogWarn = (str) => {
  console.log(colors.yellow(str));
};
const consoleLogError = (str) => {
  console.log(colors.red(str));
};

module.exports = {
  IsNPMPackageName,
  IsConsistOnlyEngNumUnderBar,
  ToHex,
  Timestamp,
  getNPMPackageInfo,
  ReplaceFileRowToIdentifier,
  consoleLogData,
  consoleLogInfo,
  consoleLogHelp,
  consoleLogWarn,
  consoleLogError,
};
