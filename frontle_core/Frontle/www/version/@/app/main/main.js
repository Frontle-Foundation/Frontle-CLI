import { frontle } from "../../browser_modules/@frontle/frontle-core/index.js";
import mainHtml from "./main.html.js";

const main = (params) => {
  const index = params.index || 0;
  const isEvenNumber = index % 2 === 0;

  // Rendering
  mainHtml.render();
  mainHtml.changeLogo(isEvenNumber);

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
