const mainCSS = () => {
  return /* css */ `
    .mainLogo {
      position: absolute;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 25vw;
    }

    @media screen and (max-width: 640px) {
      .mainLogo {
        width: 45vw;
      }
    }
  `;
};

export default mainCSS;
