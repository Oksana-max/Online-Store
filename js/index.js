import { render } from "./main.js";
import { slider } from "./slider.js";
import { burgerMenu } from "./burger-menu.js";
import { selectFooter } from "./select-footer.js";
import { scroll } from "./scrollHeader.js";
import { counterInCard } from "./counterCard.js";
document.addEventListener("DOMContentLoaded", () => {
  render();
  scroll();
  counterInCard();
  slider();
  burgerMenu();
  selectFooter();
});
