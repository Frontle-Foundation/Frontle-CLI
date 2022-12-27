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
    const msg = e.message;
    const output = e.output;
    if (output !== false && msg !== "\n" && msg !== "" && msg !== " ") {
      util.consoleLogError(msg);
    }
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
    "Install the npm packages in a form that can be used in the browser"
  )
  .option("-n, --noBuild", "Install npm package without building")
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
    'Uninstall the npm package installed with "frontle install" command'
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
  .option("-c, --cacheBusting", "Cache busting by randomly changing file paths")
  .option(
    "-f, --fenv <FRONTLE_ENV>",
    'Set the value of "frontle.env.FRONTLE_ENV"'
  )
  .option("-r, --reset", "Revert to pre-build state")
  .action(async (options) => {
    await actionRunner(() => require("./cli/build.js")(options));
  });

program.parse();
