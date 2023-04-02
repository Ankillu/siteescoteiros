document.addEventListener('DOMContentLoaded', function() {
    // Select elements from the DOM
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const images = document.querySelectorAll('.mySlides');
  
    // Variables
    const size = carouselImages[0].clientWidth;
    const transitionTime = 5000;
    let counter = 0;
    let index = 0;
    let transitionTimeout;
  
    // Add event listeners
    navLinks.forEach(function(link) {
      link.addEventListener('click', clickHandler);
    });
  
    nextBtn.addEventListener('click', function() {
      updateCarouselPosition(counter + 1);
    });
  
    prevBtn.addEventListener('click', function() {
      updateCarouselPosition(counter - 1);
    });
  
    carouselSlide.addEventListener('transitionend', function() {
      if (carouselImages[counter].id === 'lastClone') {
        updateCarouselPosition(carouselImages.length - 2, false);
      }
      if (carouselImages[counter].id === 'firstClone') {
        updateCarouselPosition(carouselImages.length - counter, false);
      }
    });
  
    // Functions
    function clickHandler(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const offsetTop = document.querySelector(href).offsetTop;
      scroll({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  
    function updateCarouselPosition(newCounter, withTransition = true) {
      clearTimeout(transitionTimeout);
  
      if (newCounter >= carouselImages.length) {
        newCounter = 0;
      } else if (newCounter < 0) {
        newCounter = carouselImages.length - 1;
      }
  
      const transformValue = -size * newCounter;
  
      if (withTransition) {
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
      } else {
        carouselSlide.style.transition = 'none';
      }
  
      carouselSlide.style.transform = `translateX(${transformValue}px)`;
      counter = newCounter;
  
      transitionTimeout = setTimeout(function() {
        updateCarouselPosition(counter + 1);
      }, transitionTime);
    }
  
    // Slideshow
    setInterval(function() {
      index = (index + 1) % images.length;
      images.forEach(function(img) {
        img.style.transform = `translateX(-${index * 100}%)`;
      });
    }, 5000);
  });
  