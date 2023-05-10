/////////////////////////////Local Storage//////////////////////////////////////////////////
export function addToLocalStorage() {
  //localStorage for productCart
  let storage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  localStorage.setItem("cart", JSON.stringify(storage));
  //localStorage for iconCart
  let iconCart = document.querySelectorAll(".header-actions__count");
  iconCart.forEach((icon) => {
    icon.innerText = localStorage.getItem("iconCart") ? JSON.parse(localStorage.getItem("iconCart")) : "0";
    localStorage.setItem("iconCart", JSON.stringify(icon.innerText));
  });

  window.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-cart")) {
      const card = e.target.closest(".card-pr");

      const productToCart = {
        id: card.dataset.id,
        imgSrc: card.querySelector(".card-pr__img").querySelector("img").getAttribute("src"),
        title: card.querySelector(".card-pr__title").innerText,
        price: card.querySelector(".card-pr__price").innerText,
        count: card.querySelector(".count-card-pr__current").innerText,
      };

      if (productToCart.count > 0) {
        storage.push(productToCart);
      }
      iconCart.forEach((icon) => {
        //Меняем количество в iconCart при добавлении товара в корзину и в Local Storage
        icon.innerText = parseInt(icon.innerText) + parseInt(card.querySelector(".count-card-pr__current").innerText);
        localStorage.setItem("iconCart", JSON.stringify(icon.innerText));
      });
      localStorage.setItem("cart", JSON.stringify(storage));

      //обнуляем счетчик товара после добавления в корзину
      card.querySelector(".count-card-pr__current").innerText = "0";
    }
  });
}
