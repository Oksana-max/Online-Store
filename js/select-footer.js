export function selectFooter() {
  let list = document.querySelectorAll(".item-footer__list"); //ul
  let item = document.querySelectorAll(".item-footer"); //один столбец
  selectListOpen();

  function selectListOpen() {
    let selectTitle = document.querySelectorAll(".item-footer__title");
    selectTitle.forEach((title) => {
      title.addEventListener("click", () => {
        title.parentNode.classList.toggle("active");
      });
    });
  }
}
