import demoCSS from "./demo.css.js";

const demoHTML = () => {
  return /* html */ `
    <style>${demoCSS()}</style>

    <img src="@/assets/img/Logo2.svg" class="demoLogo" />
  `;
};

export default demoHTML;
