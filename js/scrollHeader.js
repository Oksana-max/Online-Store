export function scroll() {
  window.addEventListener("scroll", () => {
    const screenWidth = window.innerWidth;
    let headerTop = document.querySelector(".header__top");
    let height_header = headerTop.offsetHeight;
    let windowY = window.scrollY;
    if (windowY >= height_header) {
      headerTop.classList.add("header-scroll");
    } else {
      headerTop.classList.remove("header-scroll");
    }
    if (screenWidth < 880) {
      headerTop.classList.remove("header-scroll");
    }
  });
}
