const util = require("../util/util.js");
const shellUtil = require("../util/shell_util.js");
const cliUtil = require("../util/cli_util.js");
const config = require("../config/config.js");

// Uninstall package
module.exports = (enteredPackageFullName) => {
  try {
    // Check root path
    cliUtil.checkRootPath();

    // Get package name
    const { packageName } = util.getNPMPackageInfo(enteredPackageFullName);

    // Uninstall package
    shellUtil.shell_exec(`npm uninstall ${packageName}`);
    shellUtil.shell_rm(
      `./${config.path["www/version/@/browser_modules"]}/${packageName}`
    );

    // Record uninstalled package in package.json
    let packageJsonData = cliUtil.getPackageJsonData();
    if (packageJsonData.frontle.dependencies[packageName] !== undefined) {
      delete packageJsonData.frontle.dependencies[packageName];
    }
    cliUtil.setPackageJsonData(packageJsonData);

    // Success Message Output
    util.consoleLogData(`Complete uninstallation of "${packageName}" package`);
  } catch (e) {
    throw e;
  }
};
