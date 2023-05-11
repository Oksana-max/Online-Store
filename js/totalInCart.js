export function total() {
    const cart = document.querySelector(".cart");
  
     if (cart) {
    const items = cart.querySelectorAll(".item");
    let totalBlock = document.querySelector(".cart__total");
    totalBlock = totalBlock.querySelector("span");
    let total = 0;

    if (items) {
      items.forEach((el) => {
        let price = el.querySelector(".item__price").innerText.slice(0, -3);
        let count = el.querySelector(".count-card-pr__current").innerText;

        total = parseInt(count) * parseFloat(price) + total;
        totalBlock.innerHTML = total.toFixed(2);
      });
    }
  }
  
}
