import { deleteItemFromCart } from "./deleteItemFromCart.js";
import { total } from "./totalInCart.js";
import { cartModal } from "./cartModal.js";
function cart() {
  let iconCart = document.querySelectorAll(".header-actions__count");
  const cartWrapper = document.querySelector(".cart__wrapper");
  const cartStorage = JSON.parse(localStorage.getItem("cart"));

  let emptyCart = `<h2 class="cart__empty">Cart is empty..</h2>`;
  if (cartStorage && cartStorage.length) {
    cartStorage.forEach((el) => {
      const cartHtml = `
      
        <div class="cart__item item" data-id='${el.id}'">
          <span class="item__delete">X</span>
           <div class = "item__content">
              <a href="#" class="item__img"><img src=${el.imgSrc} alt="product"/></a>
                <div class = "item__title"><a href="'#">${el.title}</a></div>
                 <div class="item__price">${el.price}</div>
           </div>
                  
            <div class="card-pr__count count-card-pr count-cart">
               <div class="count-card-pr__control" data-action="minus">-</div>
               <div class="count-card-pr__current" data-counter>${el.count}</div>
               <div class="count-card-pr__control" data-action="plus">+</div>
            </div>
        </div>
     
      
    `;
      if (cartWrapper) {
        cartWrapper.insertAdjacentHTML("afterbegin", cartHtml);
      }
    });
    total();

    //Если в корзине ничего нет
  } else {
    if (cartWrapper) {
      cartWrapper.insertAdjacentHTML("afterbegin", emptyCart);
    }

    localStorage.setItem("iconCart", JSON.stringify("0"));
  }

  //Удаление из корзины
  function deleteCart() {
    const iconDelete = document.querySelectorAll(".item__delete");
    if (iconDelete) {
      iconDelete.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          //Удаляемая карточка
          const deleteItem = e.target.parentNode;

          //Count у удаляемой карточки
          let countOfDeleteItem = deleteItem.querySelector(".count-card-pr__current").innerText;

          //меняем iconCart после удаления товара
          iconCart.forEach((icon) => {
            icon.innerText = parseInt(icon.innerText) - countOfDeleteItem;
          });

          deleteItemFromCart(deleteItem);
          total();
        });
      });
    }
  }

  deleteCart();
}
cartModal();
cart();
