import { jquery } from "../../browser_modules/jquery/module.js"; // "frontle install jquery"
const $ = jquery;

const css = /* css */ `
  .logo {
    position: absolute;
    width: 30vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 640px) {
    .logo {
      width: 60vw;
    }
  }
`;

const render = () => {
  document.getElementById("app").innerHTML = /* html */ `
    <style>${css}</style>
    <img class="logo" src="@/assets/img/Logo1.svg" />
  `;
};

const changeLogo = (isIndexEven) => {
  $(".logo").attr(
    "src",
    isIndexEven ? "@/assets/img/Logo1.svg" : "@/assets/img/Logo2.svg"
  );
};

export default { render, changeLogo };
