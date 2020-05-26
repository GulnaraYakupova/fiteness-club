'use strict';

var togglesBlock = document.querySelector('.controls');
var toggles = document.querySelectorAll('.controls__button');
var planes = document.querySelectorAll('.planes__list');
var firstPlan = document.querySelector('.planes__list--first');
var secondPlan = document.querySelector('.planes__list--second');
var thirdPlan = document.querySelector('.planes__list--third');

var phoneField = document.querySelector('#phone');

var reviewsPrevButton = document.querySelector('#reviews-prev');
var reviewsNextButton = document.querySelector('#reviews-next');
var reviews = document.querySelectorAll('.reviews__item');
var reviewsStep = 1;

window.iMaskJS(phoneField, {mask: '+{7}(000)000-00-00'});

var togglesMap = {
  first: 'controls__button--first',
  second: 'controls__button--second',
  third: 'controls__button--third',
};

togglesBlock.addEventListener('click', function (evt) {
  if (!evt.target.closest('button').classList.contains('controls__button--active')) {
    toggles.forEach(function (toggle) {
      if (toggle.classList.contains('controls__button--active')) {
        toggle.classList.remove('controls__button--active');
      }
    });

    var toggleButton = evt.target.closest('button');
    toggleButton.classList.add('controls__button--active');

    planes.forEach(function (plan) {
      if (plan.classList.contains('planes__list--shown')) {
        plan.classList.remove('planes__list--shown');
      }
    });

    if (toggleButton.classList.contains(togglesMap.first)) {
      firstPlan.classList.add('planes__list--shown');
    } else if (toggleButton.classList.contains(togglesMap.second)) {
      secondPlan.classList.add('planes__list--shown');
    } else if (toggleButton.classList.contains(togglesMap.third)) {
      thirdPlan.classList.add('planes__list--shown');
    }
  }
});

if (reviewsNextButton && reviews) {
  reviewsNextButton.addEventListener('click', function () {
    var currentIndex = Array.from(reviews).findIndex(function (review) {
      return review.classList.contains('reviews__item--active');
    });
    reviews[currentIndex].classList.remove('reviews__item--active');
    reviews[currentIndex].classList.add('reviews__item--hidden');

    if (currentIndex < reviews.length - 1) {
      reviews[currentIndex + reviewsStep].classList.remove('reviews__item--hidden');
      reviews[currentIndex + reviewsStep].classList.add('reviews__item--active');
    } else {
      reviews[0].classList.remove('reviews__item--hidden');
      reviews[0].classList.add('reviews__item--active');
    }
  });
}

if (reviewsPrevButton && reviews) {
  reviewsPrevButton.addEventListener('click', function () {
    var currentIndex = Array.from(reviews).findIndex(function (review) {
      return review.classList.contains('reviews__item--active');
    });
    reviews[currentIndex].classList.remove('reviews__item--active');
    reviews[currentIndex].classList.add('reviews__item--hidden');

    if (currentIndex > 0) {
      reviews[currentIndex - reviewsStep].classList.remove('reviews__item--hidden');
      reviews[currentIndex - reviewsStep].classList.add('reviews__item--active');
    } else {
      reviews[reviews.length - 1].classList.remove('reviews__item--hidden');
      reviews[reviews.length - 1].classList.add('reviews__item--active');
    }
  });
}
