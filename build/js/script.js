'use strict';

// для табов
var togglesBlock = document.querySelector('.controls');
var toggles = document.querySelectorAll('.controls__button');
var planes = document.querySelectorAll('.planes__list');
var firstPlan = document.querySelector('.planes__list--first');
var secondPlan = document.querySelector('.planes__list--second');
var thirdPlan = document.querySelector('.planes__list--third');

var togglesMap = {
  first: 'controls__button--first',
  second: 'controls__button--second',
  third: 'controls__button--third',
};

// для валидации телофона
var phoneField = document.querySelector('#phone');

// для слайдера отзывов
var reviewsPrevButton = document.querySelector('#reviews-prev');
var reviewsNextButton = document.querySelector('#reviews-next');
var reviews = document.querySelectorAll('.reviews__item');
var reviewsStep = 1;

// для слайдера тренеров
var trainersPrevButton = document.querySelector('#trainers-prev');
var trainersNextButton = document.querySelector('#trainers-next');
var trainers = Array.from(document.querySelectorAll('.trainers__list-item'));

var clientWidthMap = {
  desktop: 1200,
  tablet: 1199,
  mobile: 767,
};

var trainersStepMap = {
  desktop: 4,
  tablet: 2,
  mobile: 1,
};


// валидаци номера телефона
window.iMaskJS(phoneField, {mask: '+{7}(000)000-00-00', minLength: 15});


// переключение табов в блоке Абонементы
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


// работа слайдера в блоке Отзывы
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


// работа слайдера в блоке Тренеры
var getSliderStep = function () {
  var clientWidth = document.body.clientWidth;
  if (clientWidth >= clientWidthMap.desktop) {
    return trainersStepMap.desktop;
  } else if (clientWidth < clientWidthMap.tablet && clientWidth > clientWidthMap.mobile) {
    return trainersStepMap.tablet;
  }

  return trainersStepMap.mobile;
};

var getScreenSize = function () {
  return document.body.clientWidth;
};

trainersNextButton.addEventListener('click', function () {

  var firstIndex = trainers.findIndex(function (trainerNode) {
    var screenSize = getScreenSize();
    if (screenSize >= clientWidthMap.desktop) {
      return !trainerNode.classList.contains('trainers__list-item--hidden');
    } else if (screenSize < clientWidthMap.tablet && screenSize > clientWidthMap.mobile) {
      return !trainerNode.classList.contains('trainers__list-item--tablet-hidden');
    }
    return !trainerNode.classList.contains('trainers__list-item--mobile-hidden');
  });

  var itemsAmount = getSliderStep();

  var activeNodes = trainers.slice(firstIndex, firstIndex + itemsAmount);

  activeNodes.forEach(function (activeNode) {
    activeNode.classList.add('trainers__list-item--hidden');
    activeNode.classList.add('trainers__list-item--tablet-hidden');
    activeNode.classList.add('trainers__list-item--mobile-hidden');
  });

  var startIndex = firstIndex + activeNodes.length;

  if (startIndex >= trainers.length) {
    startIndex = 0;
  }

  var newActiveItems = trainers.slice(startIndex, startIndex + trainersStepMap.desktop);

  newActiveItems.forEach(function (item) {
    if (item.classList.contains('trainers__list-item--hidden')) {
      item.classList.remove('trainers__list-item--hidden');
    }
  });

  newActiveItems.slice(0, trainersStepMap.tablet).forEach(function (item) {
    if (item.classList.contains('trainers__list-item--tablet-hidden')) {
      item.classList.remove('trainers__list-item--tablet-hidden');
    }
  });

  newActiveItems.slice(trainersStepMap.tablet, trainersStepMap.tablet + trainersStepMap.tablet).forEach(function (item) {
    if (!item.classList.contains('trainers__list-item--tablet-hidden')) {
      item.classList.add('trainers__list-item--tablet-hidden');
    }
  });

  newActiveItems.slice(0, trainersStepMap.mobile).forEach(function (item) {
    if (item.classList.contains('trainers__list-item--mobile-hidden')) {
      item.classList.remove('trainers__list-item--mobile-hidden');
    }
  });

  newActiveItems.slice(trainersStepMap.mobile, trainersStepMap.desktop).forEach(function (item) {
    if (!item.classList.contains('trainers__list-item--mobile-hidden')) {
      item.classList.add('trainers__list-item--mobile-hidden');
    }
  });
});

trainersPrevButton.addEventListener('click', function () {
  var firstIndex = trainers.findIndex(function (trainerNode) {
    var screenSize = getScreenSize();
    if (screenSize >= clientWidthMap.desktop) {
      return !trainerNode.classList.contains('trainers__list-item--hidden');
    } else if (screenSize < clientWidthMap.tablet && screenSize > clientWidthMap.mobile) {
      return !trainerNode.classList.contains('trainers__list-item--tablet-hidden');
    }
    return !trainerNode.classList.contains('trainers__list-item--mobile-hidden');
  });

  var itemsAmount = getSliderStep();

  var activeNodes = trainers.slice(firstIndex, firstIndex + itemsAmount);

  activeNodes.forEach(function (activeNode) {
    activeNode.classList.add('trainers__list-item--hidden');
    activeNode.classList.add('trainers__list-item--tablet-hidden');
    activeNode.classList.add('trainers__list-item--mobile-hidden');
  });

  var startIndex = firstIndex;

  if (!firstIndex) {
    startIndex = trainers.length;
  }

  var newActiveItems = trainers.slice(startIndex - activeNodes.length, startIndex).reverse();

  newActiveItems.forEach(function (item) {
    if (item.classList.contains('trainers__list-item--hidden')) {
      item.classList.remove('trainers__list-item--hidden');
    }
  });

  newActiveItems.slice(0, trainersStepMap.tablet).forEach(function (item) {
    if (item.classList.contains('trainers__list-item--tablet-hidden')) {
      item.classList.remove('trainers__list-item--tablet-hidden');
    }
  });

  newActiveItems.slice(trainersStepMap.tablet, trainersStepMap.tablet + trainersStepMap.tablet).forEach(function (item) {
    if (!item.classList.contains('trainers__list-item--tablet-hidden')) {
      item.classList.add('trainers__list-item--tablet-hidden');
    }
  });

  newActiveItems.slice(0, trainersStepMap.mobile).forEach(function (item) {
    if (item.classList.contains('trainers__list-item--mobile-hidden')) {
      item.classList.remove('trainers__list-item--mobile-hidden');
    }
  });

  newActiveItems.slice(trainersStepMap.mobile, trainersStepMap.desktop).forEach(function (item) {
    if (!item.classList.contains('trainers__list-item--mobile-hidden')) {
      item.classList.add('trainers__list-item--mobile-hidden');
    }
  });
});
