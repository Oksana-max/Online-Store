import { renderCart } from "./renderCart.js";
export function deleteItemFromCart(deleteItem) {
  //Удаляем элемент со страницы
  deleteItem.remove();
  //Обновляем LocalStorage
  renderCart();
}
