import { total } from "./totalInCart.js";
import { renderCart } from "./renderCart.js";
import { deleteItemFromCart } from "./deleteItemFromCart.js";
export function counterInCard() {
  let counter;
  let counterWrapper;
  const iconCart = document.querySelectorAll(".header-actions__count");
  document.addEventListener("click", (e) => {
    if (e.target.dataset.action === "plus" || e.target.dataset.action === "minus") {
      counterWrapper = e.target.closest(".count-card-pr");
      if (counterWrapper) {
        counter = counterWrapper.querySelector("[data-counter]");
      }
    }

    //Нажатие на кнопку плюс на товаре в корзине/////////////////+//////////////////////////////////////////
    if (e.target.dataset.action === "plus") {
      counter.innerText = ++counter.innerText;

      total();

      //При нажатии кнопки "плюс" добавляем единицу к iconCart
      if (window.location.pathname === "/cart.html") {
        iconCart.forEach((icon) => {
          icon.innerText = parseInt(icon.innerText) + 1;
        });
      }
      renderCart();
    }

    //Нажатие на кнопку минус на товаре в корзине/////////////////////-///////////////////////////////////////////////
    if (e.target.dataset.action === "minus") {
      if (counter.innerText > 0) {
        counter.innerText = --counter.innerText;

        total();
        //При нажатии кнопки "минус" убавляем единицу из iconCart
        if (window.location.pathname === "/cart.html") {
          iconCart.forEach((icon) => {
            icon.innerText = parseInt(icon.innerText) - 1;
          });
        }
        renderCart();
      }

      //Если при нажатии на "минус" count становится меньше 1, то товар удаляется
      if (window.location.pathname === "/cart.html") {
        if (counter.innerText < 1) {
          const deleteItem = e.target.parentNode.parentNode;
          deleteItemFromCart(deleteItem);
        }
      }
    }
  });
}
