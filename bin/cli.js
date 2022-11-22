#!/usr/bin/env node

const util = require("./util/util.js");
const { Command } = require("commander");
const config = require("./config/config.js");
const program = new Command();
const actionRunner = async (fn = () => {}) => {
  try {
    await fn();
    process.exit();
  } catch (e) {
    if (e !== "\n" && e !== "" && e !== " ") util.consoleLogError(e);
    process.exit(1);
  }
};
program
  .name(config.packageName)
  .description(config.packageDescription)
  .version(config.packageVersion);

// create
program
  .command("create")
  .description("Create a Frontle project")
  .argument(
    "<projectName>",
    "The name of the project to create. The project name can only be English, numbers, _ combinations"
  )
  .action(async (projectName) => {
    await actionRunner(() => require("./cli/create.js")(projectName));
  });

// install
program
  .command("install")
  .description(
    "Install the npm package in a form that can be used in the browser"
  )
  .option("-n, --notBuild", "Install npm packages without building")
  .argument("[npmPackageName]", "npm package name to install")
  .action(async (enteredPackageFullName, options) => {
    await actionRunner(() =>
      require("./cli/install.js")(enteredPackageFullName, options)
    );
  });

// uninstall
program
  .command("uninstall")
  .description(
    'Remove the npm packages installed with "frontle install" command'
  )
  .argument("<npmPackageName>", "npm package name to uninstall")
  .action(async (enteredPackageFullName) => {
    await actionRunner(() =>
      require("./cli/uninstall.js")(enteredPackageFullName)
    );
  });

// build
program
  .command("build")
  .description("Use build functions")
  .option(
    "-v, --buildVersion [buildVersion]",
    "Version to apply to the project. If nothing is specified, it will be applied randomly"
  )
  .option(
    "-f, --fenv <FRONTLE_ENV>",
    'Set the value of "frontle.env.FRONTLE_ENV"'
  )
  .action(async (options) => {
    await actionRunner(() => require("./cli/build.js")(options));
  });

program.parse();
