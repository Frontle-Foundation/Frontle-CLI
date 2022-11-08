import mainCSS from "./main.css.js";

const mainHTML = () => {
  return /* html */ `
    <style>${mainCSS()}</style>
    
    <img src="@/assets/img/Logo1.svg" class="mainLogo" />
  `;
};

export default mainHTML;
