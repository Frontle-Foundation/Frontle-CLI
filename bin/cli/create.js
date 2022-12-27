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

    // Check git
    shellUtil.shell_exec("git -v");

    // Install frontle project
    shellUtil.shell_exec(
      `git clone -b ${config.projectReleaseTag} --single-branch https://github.com/Frontle-Foundation/Frontle.git ${projectName}`
    );
    shellUtil.shell_exec(`cd ${projectName} && rm -rf .git && git init`);

    // Success Message Output
    util.consoleLogData(`Project created with name "${projectName}"`);
  } catch (e) {
    throw e;
  }
};
