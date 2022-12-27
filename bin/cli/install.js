const util = require("../util/util.js");
const shellUtil = require("../util/shell_util.js");
const cliUtil = require("../util/cli_util.js");
const config = require("../config/config.js");
const fs = require("fs");
const browserify = require("browserify");

// Install all packages
const allInstall = async () => {
  try {
    // Install all packages
    shellUtil.shell_exec(`npm install`);

    // Check if browser_modules folder exists, create if not
    if (!cliUtil.isDir(config.path["www/version/@/browser_modules"])) {
      shellUtil.shell_mkdir(config.path["www/version/@/browser_modules"]);
    }

    // Install all frontle packages
    const packageJsonData = cliUtil.getPackageJsonData();
    const frontlePackageNames = Object.keys(
      packageJsonData.frontle.dependencies
    );
    for (const packageName of frontlePackageNames) {
      // Check if the package name exists
      if (
        packageName === undefined ||
        packageName === null ||
        packageName === ""
      ) {
        throw { message: "Invalid package name" };
      }

      // Get installed package path on node_modules
      const installedPackagePath = `./${config.path["node_modules"]}/${packageName}`;

      // Check that the package is installed
      if (!cliUtil.isDir(installedPackagePath)) {
        throw { message: `"${packageName}" doesn\'t exist in node_modules` };
      }

      // Get package type
      const packageType = JSON.parse(
        fs.readFileSync(`${installedPackagePath}/package.json`).toString()
      ).type;

      // Building
      util.consoleLogData(`Building package "${packageName}"`);
      await buildPackage(
        packageName,
        packageType,
        packageJsonData.frontle.dependencies[packageName].noBuild === true
      );

      // Installation Success Message Output
      util.consoleLogData(`Package "${packageName}" install complete`);
    }
  } catch (e) {
    throw e;
  }
};

// Install package
const install = async (enteredPackageFullName, noBuild) => {
  try {
    // Check package full name
    util.IsNPMPackageName(enteredPackageFullName);

    // Get package name, version
    const { packageName, packageFullName } = util.getNPMPackageInfo(
      enteredPackageFullName
    );

    // Check if browser_modules folder exists, create if not
    if (!cliUtil.isDir(config.path["www/version/@/browser_modules"])) {
      shellUtil.shell_mkdir(config.path["www/version/@/browser_modules"]);
    }

    // Install package
    shellUtil.shell_exec(`npm uninstall ${packageFullName}`);
    shellUtil.shell_exec(`npm install ${packageFullName}`);

    // Record installed package in package.json
    let packageJsonData = cliUtil.getPackageJsonData();
    packageJsonData.frontle.dependencies[packageName] = {
      noBuild: noBuild,
    };
    cliUtil.setPackageJsonData(packageJsonData);

    // Get installed package path on node_modules
    const installedPackagePath = `./${config.path["node_modules"]}/${packageName}`;

    // Check that the package is installed
    if (!cliUtil.isDir(installedPackagePath)) {
      throw { message: `"${packageName}" doesn\'t exist in node_modules` };
    }

    // Get package type
    const packageType = JSON.parse(
      fs.readFileSync(`${installedPackagePath}/package.json`).toString()
    ).type;

    // Building
    util.consoleLogData(`Building package "${packageFullName}"`);
    await buildPackage(packageName, packageType, noBuild);

    // Installation Success Message Output
    util.consoleLogData(`Package "${packageFullName}" install complete`);
  } catch (e) {
    throw e;
  }
};

// Build the package
const buildPackage = async (packageName, packageType = "", noBuild) => {
  try {
    // Set the package installation path
    const packageFolderPath = `./${config.path["www/version/@/browser_modules"]}/${packageName}`;
    const bundlePath = `${packageFolderPath}/bundle.js`;

    // Delete existing packages
    shellUtil.shell_rm(packageFolderPath);

    // Handle if no build
    if (noBuild === true) {
      shellUtil.shell_cp(
        `./${config.path["node_modules"]}/${packageName}`,
        packageFolderPath
      );
      return;
    }

    // Filter package name
    const filteredPackageName = packageName
      .toLowerCase()
      .replace(/@/gi, "")
      .replace(/-/gi, "_")
      .replace(/\//gi, "_")
      .replace(/\./gi, "_");

    // create random name;
    const randomName = `_f_${util.Timestamp().toString()}`;

    // Build the package
    shellUtil.shell_mkdir(packageFolderPath);
    if (packageType === "module") {
      fs.writeFileSync(
        bundlePath,
        `
          import * as f_package from '${packageName}';
          window.${randomName} = f_package;
        `
      );
    } else {
      fs.writeFileSync(
        bundlePath,
        `window.${randomName} = require('${packageName}');`
      );
    }

    const builtSource = await new Promise((resolve, reject) => {
      browserify({
        entries: [bundlePath],
      })
        .transform(require("babelify"), {
          global: true,
          presets: [require("@babel/preset-env")],
        })
        .bundle((err, buf) => {
          if (err !== null) reject(err);
          else resolve(buf);
        });
    }).catch((e) => {
      // throw error
      throw { message: `Error while building "browserify": ${e}` };
    });

    // Remove bundle file
    shellUtil.shell_rm(bundlePath);

    // Create module file
    fs.writeFileSync(
      `${packageFolderPath}/module.js`,
      `
        ${builtSource}

        if(!window){
          var ${filteredPackageName} = require('${packageName}');
        }
        ${filteredPackageName} = window.${randomName};
        delete window.${randomName};

        export { ${filteredPackageName} };
      `
    );
  } catch (e) {
    throw e;
  }
};

// Install package
module.exports = async (enteredPackageFullName, options) => {
  try {
    // Check root path
    cliUtil.checkRootPath();

    // Install all or one
    enteredPackageFullName === undefined
      ? await allInstall()
      : await install(enteredPackageFullName, options.noBuild === true);

    // Success Message Output
    util.consoleLogData("Package installation complete");
  } catch (e) {
    throw e;
  }
};
