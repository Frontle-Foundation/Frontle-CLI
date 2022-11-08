const util = require("../util/util.js");
const shellUtil = require("../util/shell_util.js");
const cliUtil = require("../util/cli_util.js");
const config = require("../config/config.js");
const parser = require("node-html-parser").parse;
const fs = require("fs");

const setVersion = (buildVersion) => {
  try {
    if (buildVersion === undefined) return;

    // Check build version
    if (buildVersion === true) {
      buildVersion = util.Timestamp();
    } else {
      if (util.IsConsistOnlyEngNumUnderBar(buildVersion) === false) {
        throw {
          message:
            "The build version can only be English, numbers, _ combinations",
        };
      }
    }

    // Read index.html
    let fileData = fs.readFileSync(config.path["www/index.html"], "utf8");
    if (fileData === undefined || fileData === null || fileData === "") {
      throw { message: "The content of index.html does not exist" };
    }

    // Change html version
    const doc = parser(fileData);
    const elements = doc.querySelectorAll(`base`);
    if (elements.length < 1) {
      throw { message: "<base> tag does not exist" };
    }
    elements[0].setAttribute("href", `/${buildVersion}/`);
    fs.writeFileSync(config.path["www/index.html"], doc.innerHTML);

    // Change folder version
    shellUtil.shell_mv(config.path["www/version"], `www/${buildVersion}`);

    // Success Message Output
    util.consoleLogData(`Version applied with value "${buildVersion}"`);
  } catch (e) {
    throw e;
  }
};

const setEnv = (FRONTLE_ENV) => {
  try {
    if (FRONTLE_ENV === undefined) return;

    // Check FRONTLE_ENV
    if (util.IsConsistOnlyEngNumUnderBar(FRONTLE_ENV) === false) {
      throw {
        message:
          "FRONTLE_ENV value can only be English, numbers, _ combinations",
      };
    }

    // Setting FRONTLE_ENV
    util.ReplaceFileRowToIdentifier(
      config.path["www/version/@/browser_modules/frontle/frontle.js"],
      "#FRONTLE_BUILD_LINE: FRONTLE_ENV",
      `FRONTLE_ENV: "${FRONTLE_ENV}",`
    );

    // Success Message Output
    util.consoleLogData(
      `Done setting "frontle.env.FRONTLE_ENV" value to "${FRONTLE_ENV}"`
    );
  } catch (e) {
    throw e;
  }
};

// Building
module.exports = async (options) => {
  try {
    // Check root path
    cliUtil.checkRootPath();

    // env settings
    setEnv(options.fenv);

    // version settings
    setVersion(options.buildVersion);

    // Success Message Output
    util.consoleLogData("Build complete");
  } catch (e) {
    throw e;
  }
};
