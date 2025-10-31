/* в этот файл добавляет скрипты*/
const navMenu = document.querySelector('.header__nav-menu');
const navToggle = document.querySelector('.header__nav-toggle');

navMenu.classList.remove('header__nav-menu--no-js');
navToggle.classList.remove('nav-toggle--no-js');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('is-active');
  navMenu.classList.toggle('is-open');
});

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.hero__slider-wrapper');
  if (!slider) {
    return;
  }

  const prevButton = slider.querySelector('.slider-button-prev');
  const nextButton = slider.querySelector('.slider-button-next');
  const slides = slider.querySelectorAll('.hero__slide-item');
  const dots = slider.querySelectorAll('.slider-pagination__button');
  let currentSlideIndex = 0;

  const updateButtonStates = () => {
    prevButton.disabled = currentSlideIndex === 0;
    nextButton.disabled = currentSlideIndex === slides.length - 1;
  };

  const showSlide = (index) => {
    slides[currentSlideIndex].classList.remove('is-active');
    dots[currentSlideIndex].classList.remove(
      'slider-pagination__button--active'
    );
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('is-active');
    dots[currentSlideIndex].classList.add('slider-pagination__button--active');
    updateButtonStates();
  };

  nextButton.addEventListener('click', () => {
    if (currentSlideIndex < slides.length - 1) {
      showSlide(currentSlideIndex + 1);
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      showSlide(currentSlideIndex - 1);
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  updateButtonStates();
});


document.addEventListener('DOMContentLoaded', () => {
  const priceSlider = document.querySelector('.price-slider');
  if (!priceSlider) {
    return;
  }

  const minInput = document.querySelector('.catalog__filters-price-min');
  const maxInput = document.querySelector('.catalog__filters-price-max');

  noUiSlider.create(priceSlider, {
    start: [0, 900],
    connect: true,
    range: {
      min: 0,
      max: 1100,
    },
    step: 1,
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    },
  });

  priceSlider.noUiSlider.on('update', (values) => {
    minInput.value = values[0];
    maxInput.value = values[1];
  });

  minInput.addEventListener('change', () => {
    priceSlider.noUiSlider.set([minInput.value, null]);
  });
  maxInput.addEventListener('change', () => {
    priceSlider.noUiSlider.set([null, maxInput.value]);
  });
});
