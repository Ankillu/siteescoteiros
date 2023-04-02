const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

for (const link of navLinks) {
  link.addEventListener('click', clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute('href');
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: 'smooth'
  });
}

const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 0;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Button Listeners
nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) {
    carouselSlide.style.transition = 'none';
    counter = 0;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  } else {
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 1;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  } else {
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

const slideshowContainer = document.querySelector('.slideshow-container');
const images = document.querySelectorAll('.mySlides');
let index = 0;

setInterval(() => {
  index = (index + 1) % images.length;
  images.forEach((img) => {
    img.style.transform = `translateX(-${index * 100}%)`;
  });
}, 5000);
