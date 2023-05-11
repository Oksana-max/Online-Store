//Модальное окно для заказа в корзине
export function cartModal() {
  const modal = document.querySelector(".modal-order");
  const btnOrder = document.querySelector(".cart__order");
  const reset = document.querySelector(".modal-order__reset");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const arrayForForm = [];

  let totalCount = document.querySelector(".product-order__quantity");
  let quantity = 0;
  if (totalCount) {
    totalCount = totalCount.querySelector("span");
  }
  let totalOrder = document.querySelector(".product-order__sum");
  let totalSum = 0;
  if (totalOrder) {
    totalOrder = totalOrder.querySelector("span");
  }

  if (btnOrder) {
    btnOrder.addEventListener("click", () => {
      modalWrapper.classList.add("modal-open");
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      //Закрытие модального окна при клике на крестик
      reset.addEventListener("click", () => {
        modal.style.display = "none";
        modalWrapper.classList.remove("modal-open");
        totalSum = 0;
        quantity = 0;
        productList.innerHTML = "";
        document.body.style.overflow = "auto";
      });

      //Закрытие модального окна при клике по пустому окну
      if (modalWrapper.classList.contains("modal-open")) {
        modalWrapper.addEventListener("click", (e) => {
          if (e.target.classList.contains("modal-open")) {
            modal.style.display = "none";
            modalWrapper.classList.remove("modal-open");
            productList.innerHTML = "";
            totalSum = 0;
            quantity = 0;
            document.body.style.overflow = "auto";
          }
        });
      }

      //Закрытие модального окна по нажатию кнопки esc
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
          modal.style.display = "none";
          modalWrapper.classList.remove("modal-open");
          productList.innerHTML = "";
          totalSum = 0;
          quantity = 0;
          document.body.style.overflow = "auto";
        }
      });

      //собираем информацию о всех продуктах в корзине и помещаем в модально окно заказа

      const cartWrapper = document.querySelector(".cart__wrapper").children;
      const cartStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      const productList = document.querySelector(".product-order__list");
      const arrayProducts = Array.from(cartWrapper);

      if (cartStorage.length > 0) {
        arrayProducts.forEach((item) => {
          const cartItem = {
            id: item.dataset.id,
            title: item.querySelector(".item__title").innerText,
            price: item.querySelector(".item__price").innerText,
            count: item.querySelector(".count-card-pr__current").innerText,
            imgSrc: item.querySelector(".item__img").querySelector("img").getAttribute("src"),
          };
          arrayForForm.push(cartItem);
          let html = `
              <li class="product-order__item">
                <div class="product-order__name">${cartItem.title}</div>
                <div class="product-order__price">price: <span> ${cartItem.price}</span></div>
                <div class="product-order__count">count: <span>${cartItem.count}</span></div>
              </li>
            `;

          //считаем общую сумму заказа
          totalSum = parseInt(cartItem.count) * parseFloat(cartItem.price.slice(0, -3)) + totalSum;
          totalOrder.innerHTML = totalSum.toFixed(2);
          //считаем общее количество продуктов в заказе
          quantity = parseInt(cartItem.count) + parseInt(quantity);
          totalCount.innerHTML = quantity;
          productList.insertAdjacentHTML("afterbegin", html);
        });
      }
    });
  }

  //Маска на поле 'phone'
  let selector = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask("+7(999)999-99-99");
  im.mask(selector);

  //Валидация
  const validation = new JustValidate(".order");

  validation
    .addField(".email", [
      {
        rule: "required",
        errorMessage: "Email is required",
      },
      {
        rule: "email",
        errorMessage: "Email is invalid!",
      },
    ])

    .addField(".tel", [
      {
        rule: "required",
        errorMessage: "Phone is required",
      },
    ])

    .addField(".name", [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "maxLength",
        value: 30,
      },
    ])
    .onSuccess((e) => {
      e.preventDefault();
      console.log("Validation passes and form submitted ");
      let formData = new FormData(e.target);
      formData.append("products", JSON.stringify(arrayForForm));
      let name = e.target.querySelector('[name="name"]').value;
      let tel = e.target.querySelector('[name="phone"]').value;
      let mail = e.target.querySelector('[name="email"]').value;
      formData.append("Name", name);
      formData.append("Phone", tel);
      formData.append("Email", mail);

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Отправлено");
            alert("The order has been sent");
          }
        }
      };
      xhr.open("POST", "mail.php", true);
      xhr.send(formData);

      e.target.reset();
    });
}

