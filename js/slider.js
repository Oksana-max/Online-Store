export function slider() {
  let commentsSlider = document.querySelector(".comments__slider");
  if (commentsSlider) {
    const swiper = new Swiper(".comments__slider", {
      navigation: {
        nextEl: ".comments__btn-next",
        prevEl: ".comments__btn-prev",
      },
      speed: 800,
      breakpoints: {
        650: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        820: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        992: {
          slidesPerView: 3.5,
          spaceBetween: 32,
        },
        1250: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      },
    });
  }
}
