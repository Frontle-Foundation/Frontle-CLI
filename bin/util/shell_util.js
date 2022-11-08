const shelljs = require("shelljs");
const path = require("path");
const util = require("./util.js");
shelljs.config.silent = true;

// check shell error
const checkShellError = (result) => {
  try {
    if (result.stderr !== "" && String(result.code) !== "0") {
      throw result.stderr;
    }
  } catch (e) {
    throw e;
  }
};

// output shell log
const outputShellLog = (result) => {
  try {
    if (
      result.stdout !== "\n" &&
      result.stdout !== "" &&
      result.stdout !== " "
    ) {
      util.consoleLogData(result.stdout);
    }
  } catch (e) {
    throw e;
  }
};

// shell: exec
const shell_exec = (command, silent = true) => {
  try {
    const result = shelljs.exec(command, {
      silent: silent,
    });
    if (!silent) return;
    checkShellError(result);
    outputShellLog(result);
  } catch (e) {
    throw e;
  }
};

// shell: rm
const shell_rm = (path, option = "-rf") => {
  try {
    const result = shelljs.rm(option, path);
    checkShellError(result);
    outputShellLog(result);
  } catch (e) {
    throw e;
  }
};

// shell: cp
const shell_cp = (fromPath, toPath, option = "-Rf") => {
  try {
    // create parents path
    shell_mkdir(path.dirname(toPath));

    const result = shelljs.cp(option, fromPath, toPath);
    checkShellError(result);
    outputShellLog(result);
  } catch (e) {
    throw e;
  }
};

// shell: mv
const shell_mv = (fromPath, toPath, option = "-f") => {
  try {
    // create parents path
    shell_mkdir(path.dirname(toPath));

    const result = shelljs.mv(option, fromPath, toPath);
    checkShellError(result);
    outputShellLog(result);
  } catch (e) {
    throw e;
  }
};

// shell: mkdir
const shell_mkdir = (path, option = "-p") => {
  try {
    const result = shelljs.mkdir(option, path);
    checkShellError(result);
    outputShellLog(result);
  } catch (e) {
    throw e;
  }
};

// shell: echo
const shell_echo = (message) => {
  try {
    const result = shelljs.echo(message);
    checkShellError(result);
    outputShellLog(result);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  shell_exec,
  shell_rm,
  shell_cp,
  shell_mv,
  shell_mkdir,
  shell_echo,
};
