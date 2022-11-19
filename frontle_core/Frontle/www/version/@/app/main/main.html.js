import mainCss from "./main.css.js";
import { jquery } from "../../browser_modules/jquery/module.js"; // "frontle install jquery"
const $ = jquery;

const render = () => {
  document.getElementById("app").innerHTML = /* html */ `
    <style>${mainCss.css()}</style>
    <img class="logo" src="@/assets/img/Logo1.svg" />
  `;
};

// Changing the logo depending on whether the index is even or odd
const changeLogo = (isIndexEven) => {
  const src = isIndexEven ? "@/assets/img/Logo1.svg" : "@/assets/img/Logo2.svg";
  $(".logo").attr("src", src);
};

export default {
  render,
  changeLogo,
};
