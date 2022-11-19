const css = () => {
  return /* css */ `
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
};

export default { css };
