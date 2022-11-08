import demoHTML from "./demo.html.js";

// This is the package installed with the "frontle install jquery" command
import jquery from "../../browser_modules/jquery/module.js";

// Provide interfaces to packages with jsdoc
/** @type {jQuery} */ const $ = jquery;

const demo = (params) => {
  // Print the passed parameters
  console.log(params);

  // you can use jquery
  $("#app").html(demoHTML());
};

export default demo;
