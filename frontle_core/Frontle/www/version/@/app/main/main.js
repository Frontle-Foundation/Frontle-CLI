import { frontle } from "../../browser_modules/@frontle/frontle-core/index.js";
import mainView from "./mainView.js";

const main = (params) => {
  const index = params.index || 0;
  const isIndexEven = index % 2 === 0;

  // Rendering
  mainView.render();
  mainView.changeLogo(isIndexEven);

  // Move the page and pass the "index" parameter
  const timeout = setTimeout(() => {
    frontle.util.pageMove("main", { index: index + 1 });
  }, 5000);

  // Clear setTimeout when back or forward buttons are pressed
  const listener = () => {
    clearTimeout(timeout);
    return true; // Execute history.back or history.forward if listener returns true
  };
  frontle.event.back.addListener(listener);
  frontle.event.forward.addListener(listener);
};

export default main;
