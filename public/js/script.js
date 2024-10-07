var swiper = new Swiper(".swiper-container", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  }
});
var swiper = new Swiper(".swiper-testimonials", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  slidesPerView: "3",
  loop: true,
  coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,

  },
  pagination: {
      el: ".swiper-pagination",
  },
  breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },

  }
});

// Slider Tour Detail
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  loop: true,
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb,
  },
  loop: true,
});
// End Slider Tour Detail

// Show Alert

const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);

    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden")
    })
}

//End Show Alert

