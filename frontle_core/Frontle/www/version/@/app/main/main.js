import { frontle } from "../../browser_modules/@frontle/frontle-core/index.js";
import { jquery } from "../../browser_modules/jquery/module.js"; // "frontle install jquery"
const $ = jquery;

const css = /* css */ `
  .logo {
    position: absolute;
    width: 40%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const html = () => {
  return /* html */ `
    <style>${css}</style>

    <img class="logo" src="@/assets/img/Logo.svg" />
  `;
};

const main = (params) => {
  console.log(params);
  document.getElementById("app").innerHTML = html();

  // if (params.test === undefined) {
  //   frontle.util.pageMove("main", { test: "hello!" });
  // }
};

export default main;
