export function burgerMenu() {
  let iconMenu = document.querySelector(".icon-menu");
  let body = document.querySelector("body");
  const menuBody = document.querySelector(".menu__body");
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      let top = document.body.style.top;
      menuBody.classList.toggle("_active");
      document.documentElement.classList.toggle("menu-open");
      if (menuBody.classList.contains("_active")) {
        body.style.position = "fixed";
        top = `-${window.scrollY}px`;
      } else {
        body.style.position = "";
        body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    });
    //При нажатии на ссылки в меню, меню-бургер закрывается
    menuBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu__link")) {
        menuBody.classList.remove("_active");
        body.style.position = "";
        document.documentElement.classList.remove("menu-open");
      }
    });
  }
}
