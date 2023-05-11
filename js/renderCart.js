export function renderCart() {
  const cart = document.querySelector(".cart");
  const items = document.querySelectorAll(".item");
  const iconCart = document.querySelectorAll(".header-actions__count");
  let newStorage = [];
  //Находим все карточки товаров на странице Cart и проходим по ним
  items.forEach((item) => {
    let obj = {
      id: item.dataset.id,
      imgSrc: item.querySelector(".item__img").querySelector("img").getAttribute("src"),
      title: item.querySelector(".item__title").innerText,
      price: item.querySelector(".item__price").innerText,
      count: item.querySelector(".count-card-pr__current").innerText,
    };
    //Добавляем все карточки товаров в LocalStorage(обновляем LocalStorage)
    newStorage.push(obj);
  });
  localStorage.setItem("cart", JSON.stringify(newStorage));

  //Находим  все иконки count у корзины , проходим по ним и добавляем count в LocalStorage(обновляем LocalStorage)
  if (cart) {
    iconCart.forEach((icon) => {
      localStorage.setItem("iconCart", JSON.stringify(icon.innerText));
    });
  }
}
