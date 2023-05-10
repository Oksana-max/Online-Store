import { addToLocalStorage } from "./addLocalStorage.js";
import data from "./data.js";

const btnMore = document.querySelector(".products__more"),
  itemsWrapper = document.querySelector(".products__items");
let quantityProducts = 6;
let dataLength = "";
let products = "";
let filter = "All";
let value = "";
let sortValue;
export function render(quantity = 6, filterValue = "All", value = "", sortText = "inexpensive") {
  //////////версия для github без fetch////////

  if (itemsWrapper) {
    itemsWrapper.innerHTML = "";
    //Фильтрация товаров============
    let newData = data.filter((card) => {
      if (filterValue === "All") {
        return card;
      } else if (value.length > 0 && card.name.toUpperCase().includes(value)) {
        return card;
      } else if (card.category === filterValue) {
        return card;
      } else {
        return false;
      }
    });
    //=========Сортировка по цене============
    dataLength = newData.length;
    if (sortText === "inexpensive") {
      newData.sort((pr1, pr2) => pr1.price - pr2.price);
    } else {
      newData.sort((pr1, pr2) => pr2.price - pr1.price);
    }
    //Окончательный рендер на страницу==================
    if (dataLength) {
      for (let i = 0; i < newData.length; i++) {
        if (i < quantity) {
          products = `
              <div class="products__card card-pr" data-id = ${newData[i].id} data-category = ${newData[i].category}>
                <div class="card-pr__img">
                  <a href="../product.html"><img src="${newData[i].image}" alt="product" class="card-pr__image"/></a>
                </div>
                <a href="../product.html" class="card-pr__title">${newData[i].name}</a>
                <div class="card-pr__description">
                ${newData[i].description}
                </div>
                <div class="card-pr__priceAndCart">
                  <div class="card-pr__price">${newData[i].price} usd</div>
                  <button href="'#" class="card-pr__btn btn" data-cart="addToCart" >Add to Cart</button>
                </div>
                <div class="card-pr__count count-card-pr">
                  <div class="count-card-pr__control" data-action="minus">-</div>
                  <div class="count-card-pr__current" data-counter=>0</div>
                  <div class="count-card-pr__control" data-action="plus">+</div>
                </div>
            </div>
            `;
          itemsWrapper.innerHTML += products;
        }
      }
    } else {
      itemsWrapper.innerHTML += `<p class="no-products">Sorry, no products</p>`;
    }
    //Показ кнопки More=========
    if (quantityProducts >= dataLength) {
      btnMore.style.display = "none";
    } else {
      btnMore.style.display = "block";
    }
  }

  //Рендер с помощью fetch//////////
  // if (itemsWrapper) {
  //   fetch("../data/products.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       itemsWrapper.innerHTML = "";
  //       //Фильтрация товаров============
  //       let newData = data.filter((card) => {
  //         if (filterValue === "All") {
  //           return card;
  //         } else if (value.length > 0 && card.name.toUpperCase().includes(value)) {
  //           return card;
  //         } else if (card.category === filterValue) {
  //           return card;
  //         } else {
  //           return false;
  //         }
  //       });
  //       //=========Сортировка по цене============
  //       dataLength = newData.length;
  //       if (sortText === "inexpensive") {
  //         newData.sort((pr1, pr2) => pr1.price - pr2.price);
  //       } else {
  //         newData.sort((pr1, pr2) => pr2.price - pr1.price);
  //       }
  //       //Окончательный рендер на страницу==================
  //       if (dataLength) {
  //         for (let i = 0; i < newData.length; i++) {
  //           if (i < quantity) {
  //             products = `
  //             <div class="products__card card-pr" data-id = ${newData[i].id} data-category = ${newData[i].category}>
  //               <div class="card-pr__img">
  //                 <a href="../product.html"><img src="${newData[i].image}" alt="product" class="card-pr__image"/></a>
  //               </div>
  //               <a href="../product.html" class="card-pr__title">${newData[i].name}</a>
  //               <div class="card-pr__description">
  //               ${newData[i].description}
  //               </div>
  //               <div class="card-pr__priceAndCart">
  //                 <div class="card-pr__price">${newData[i].price} usd</div>
  //                 <button href="'#" class="card-pr__btn btn" data-cart="addToCart" >Add to Cart</button>
  //               </div>
  //               <div class="card-pr__count count-card-pr">
  //                 <div class="count-card-pr__control" data-action="minus">-</div>
  //                 <div class="count-card-pr__current" data-counter=>0</div>
  //                 <div class="count-card-pr__control" data-action="plus">+</div>
  //               </div>
  //           </div>
  //           `;
  //             itemsWrapper.innerHTML += products;
  //           }
  //         }
  //       } else {
  //         itemsWrapper.innerHTML += `<p class="no-products">Sorry, no products</p>`;
  //       }
  //       //Показ кнопки More=========
  //       if (quantityProducts >= dataLength) {
  //         btnMore.style.display = "none";
  //       } else {
  //         btnMore.style.display = "block";
  //       }
  //       //=====================================
  //     });
  // }
}
function filterSearch() {
  const searchForm = document.querySelector(".search-header");
  const searchInput = searchForm.querySelector(".search-header__input");
  const searchBtn = document.querySelector(".search-header__button");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    value = searchInput.value.toUpperCase();
    if (value) {
      render((quantityProducts = 6), "", value);
      searchInput.value = "";
    }
  });
}

filterSearch();

function filterMenuCategory() {
  const itemsMenu = document.querySelectorAll(".menu__link");
  const itemsAside = document.querySelectorAll(".page-nav__item");
  itemsAside.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      filter = e.target.dataset.filter;
      render((quantityProducts = 6), filter, (value = ""));
    });
  });
  itemsMenu.forEach((item) => {
    item.addEventListener("click", (e) => {
      itemsMenu.forEach((el) => el.classList.remove("checked"));
      e.preventDefault();
      item.classList.add("checked");
      filter = e.target.dataset.name;
      render((quantityProducts = 6), filter, (value = ""));
    });
  });
}
filterMenuCategory();

function loadMore() {
  if (btnMore) {
    btnMore.addEventListener("click", () => {
      quantityProducts = quantityProducts + 3;

      if (value.length > 0) {
        render(quantityProducts, (filter = ""), value, sortValue);
      } else {
        render(quantityProducts, filter, value, sortValue);
      }
    });
  }
}
loadMore();

function sort() {
  const sortSpan = document.querySelector(".sort__text");
  const sortContent = document.querySelector(".sort__content");
  const items = document.querySelectorAll(".sort__item");
  if (sortSpan) {
    sortSpan.addEventListener("click", () => {
      sortContent.classList.toggle("open");
    });
  }
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.closest(".sort__content") && !target.closest(".sort__text")) {
      if (sortContent) {
        sortContent.classList.remove("open");
      }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 27) {
      sortContent.classList.remove("open");
    }
  });

  //=========Сортировка
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      items.forEach((item) => {
        item.classList.remove("checked");
      });
      e.preventDefault();
      item.classList.add("checked");
      sortSpan.innerText = item.innerText;
      sortValue = e.target.dataset.sort;
      if (value.length > 0) {
        render(quantityProducts, (filter = ""), value, sortValue);
      } else {
        render((quantityProducts = 6), filter, (value = ""), sortValue);
      }
    });
  });
}
sort();

addToLocalStorage();
