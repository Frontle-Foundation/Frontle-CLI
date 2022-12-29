const shelljs = require("shelljs");
const path = require("path");

const checkShellError = (result) => {
  try {
    if (result.stderr !== "" && String(result.code) !== "0") {
      throw {
        message: result.stderr,
        output: false,
      };
    }
  } catch (e) {
    throw e;
  }
};

const shell_exec = (command) => {
  try {
    const result = shelljs.exec(command);
    checkShellError(result);
    return result;
  } catch (e) {
    throw e;
  }
};

const shell_rm = (path, option = "-rf") => {
  try {
    const result = shelljs.rm(option, path);
    checkShellError(result);
    return result;
  } catch (e) {
    throw e;
  }
};

const shell_cp = (fromPath, toPath, option = "-Rf") => {
  try {
    // create parents path
    shell_mkdir(path.dirname(toPath));

    const result = shelljs.cp(option, fromPath, toPath);
    checkShellError(result);
    return result;
  } catch (e) {
    throw e;
  }
};

const shell_mv = (fromPath, toPath, option = "-f") => {
  try {
    // create parents path
    shell_mkdir(path.dirname(toPath));

    const result = shelljs.mv(option, fromPath, toPath);
    checkShellError(result);
    return result;
  } catch (e) {
    throw e;
  }
};

const shell_mkdir = (path, option = "-p") => {
  try {
    const result = shelljs.mkdir(option, path);
    checkShellError(result);
    return result;
  } catch (e) {
    throw e;
  }
};

const shell_echo = (message) => {
  try {
    const result = shelljs.echo(message);
    checkShellError(result);
    return result;
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
