const util = require("../util/util.js");
const shellUtil = require("../util/shell_util.js");
const cliUtil = require("../util/cli_util.js");
const config = require("../config/config.js");
const parser = require("node-html-parser").parse;
const fs = require("fs");

const setFEnv = (FRONTLE_ENV) => {
  try {
    // Check FRONTLE_ENV
    if (util.IsConsistOnlyEngNumUnderBar(FRONTLE_ENV) === false) {
      throw {
        message:
          "FRONTLE_ENV value can only be English, numbers, _ combinations",
      };
    }

    // Setting FRONTLE_ENV
    cliUtil.set_frontle_env_FRONTLE_ENV(FRONTLE_ENV);

    // Success Message Output
    util.consoleLogData(
      `Done setting "frontle.env.FRONTLE_ENV" value to "${FRONTLE_ENV}"`
    );
  } catch (e) {
    throw e;
  }
};

const cacheBusting = () => {
  try {
    const version = util.Timestamp();

    // Read index.html
    const fileData = fs.readFileSync(config.path["www/index.html"], "utf8");
    if (fileData === undefined || fileData === null || fileData === "") {
      throw { message: "The content of index.html does not exist" };
    }

    // Setting version
    cliUtil.set_frontle_env_version(version);
    util.consoleLogData(
      `Done setting "frontle.env.version" value to "${version}"`
    );

    // Change html version
    const doc = parser(fileData);
    const elements = doc.querySelectorAll(`base`);
    if (elements.length < 1) {
      throw { message: "<base> tag does not exist" };
    }
    elements[0].setAttribute("href", `/${version}/`);
    fs.writeFileSync(config.path["www/index.html"], doc.innerHTML);

    // Change folder version
    shellUtil.shell_mv(config.path["www/version"], `www/${version}`);

    // Success Message Output
    util.consoleLogData("Cache busting done");
  } catch (e) {
    throw e;
  }
};

const reset = () => {
  try {
    resetCacheBusting();
    resetFEnv();

    // Success Message Output
    util.consoleLogData("Reset complete");
  } catch (e) {
    throw e;
  }
};
const resetCacheBusting = () => {
  try {
    // Read index.html
    const fileData = fs.readFileSync(config.path["www/index.html"], "utf8");
    if (fileData === undefined || fileData === null || fileData === "") {
      throw { message: "The content of index.html does not exist" };
    }

    // Get base tag
    const doc = parser(fileData);
    const elements = doc.querySelectorAll("base");
    if (elements.length < 1) {
      throw { message: "<base> tag does not exist" };
    }
    const baseElement = elements[0];

    // Get current version
    const currentVersion = baseElement.getAttribute("href").replace(/\//gi, "");

    // Reset index.html
    baseElement.setAttribute("href", "/version/");
    fs.writeFileSync(config.path["www/index.html"], doc.innerHTML);

    // Reset folder version
    if (currentVersion !== "version") {
      shellUtil.shell_mv(`www/${currentVersion}`, config.path["www/version"]);
    }

    // Reset frontle.env.version
    cliUtil.set_frontle_env_version("version");
    util.consoleLogData(
      `Done setting "frontle.env.version" value to "version"`
    );
  } catch (e) {
    throw e;
  }
};
const resetFEnv = () => {
  try {
    cliUtil.set_frontle_env_FRONTLE_ENV("null");
    util.consoleLogData(
      `Done setting "frontle.env.FRONTLE_ENV" value to "null"`
    );
  } catch (e) {
    throw e;
  }
};

// Building
module.exports = async (options) => {
  try {
    // Reset
    if (options.reset === true) {
      cliUtil.checkRootPath();

      reset();
    }
    // Building
    else {
      cliUtil.checkRootPath();
      cliUtil.checkNoCachebusting();

      // env settings
      if (options.fenv !== undefined) {
        setFEnv(options.fenv);
      }

      // cache busting
      if (options.cacheBusting === true) {
        cacheBusting();
      }
    }
  } catch (e) {
    throw e;
  }
};
