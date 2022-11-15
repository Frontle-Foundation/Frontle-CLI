import { frontle } from "../../browser_modules/@frontle/frontle-core/index.js";
import mainHTML from "./main.html.js";

const main = (params) => {
  // Add Page
  document.getElementById("app").innerHTML = mainHTML();

  // Go to demo page
  setTimeout(() => {
    frontle.util.pageMove("demo", {
      testParams: "test1234",
    });
  }, 3000);
};

export default main;
