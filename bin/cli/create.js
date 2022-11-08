const util = require("../util/util.js");
const shellUtil = require("../util/shell_util.js");
const fs = require("fs");
const config = require("../config/config.js");

// Create project
module.exports = (projectName) => {
  try {
    // Check project name
    if (projectName === "") {
      throw { message: "Please enter a project name" };
    }
    if (util.IsConsistOnlyEngNumUnderBar(projectName) === false) {
      throw {
        message:
          "The project name can only be English, numbers, _ combinations",
      };
    }

    // Check if the project name exists
    if (fs.existsSync(`./${projectName}`)) {
      throw {
        message: `A file named "${projectName}" already exists`,
      };
    }

    // Install frontle core
    shellUtil.shell_cp(config.path["cli/frontle_core/Frontle"], projectName);

    // Install frontle git
    shellUtil.shell_cp(
      config.path["cli/frontle_core/FrontleGit"],
      `${projectName}/.git`
    );

    // Success Message Output
    util.consoleLogData(`Project created with name "${projectName}"`);
  } catch (e) {
    throw e;
  }
};
