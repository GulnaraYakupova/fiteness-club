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

// для слайдера тренеров
var trainersNode = document.querySelector('#trainers');
var trainersPrevButton = document.querySelector('#trainers-prev');
var trainersNextButton = document.querySelector('#trainers-next');
var trainers = Array.prototype.slice.call(document.querySelectorAll('.trainers__list-item'));

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
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].classList.contains('controls__button--active')) {
        toggles[i].classList.remove('controls__button--active');
      }
    }

    var toggleButton = evt.target.closest('button');
    toggleButton.classList.add('controls__button--active');

    for (var j = 0; j < planes.length; j++) {
      if (planes[j].classList.contains('planes__list--shown')) {
        planes[j].classList.remove('planes__list--shown');
      }
    }

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

$('.reviews__list').slick({
  swipe: true,
  touchMove: true,
});

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

var slideTrainersToNext = function () {
  var firstIndex = 0;
  var screenSize = getScreenSize();

  if (screenSize >= clientWidthMap.desktop) {
    for (var b = 0; b < trainers.length; b++) {
      if (!trainers[b].classList.contains('trainers__list-item--hidden')) {
        firstIndex = b;
        break;
      }
    }
  } else if (screenSize < clientWidthMap.tablet && screenSize > clientWidthMap.mobile) {
    for (var c = 0; c < trainers.length; c++) {
      if (!trainers[c].classList.contains('trainers__list-item--tablet-hidden')) {
        firstIndex = c;
        break;
      }
    }
  } else {
    for (var k = 0; k < trainers.length; k++) {
      if (!trainers[k].classList.contains('trainers__list-item--mobile-hidden')) {
        firstIndex = k;
        break;
      }
    }
  }

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
};

var slideTrainersToPrevious = function () {
  var firstIndex = 0;
  var screenSize = getScreenSize();

  if (screenSize >= clientWidthMap.desktop) {
    for (var d = 0; d < trainers.length; d++) {
      if (!trainers[d].classList.contains('trainers__list-item--hidden')) {
        firstIndex = d;
        break;
      }
    }
  } else if (screenSize < clientWidthMap.tablet && screenSize > clientWidthMap.mobile) {
    for (var e = 0; e < trainers.length; e++) {
      if (!trainers[e].classList.contains('trainers__list-item--tablet-hidden')) {
        firstIndex = e;
        break;
      }
    }
  } else {
    for (var k = 0; k < trainers.length; k++) {
      if (!trainers[k].classList.contains('trainers__list-item--mobile-hidden')) {
        firstIndex = k;
        break;
      }
    }
  }

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
};

trainersNextButton.addEventListener('click', slideTrainersToNext);

trainersPrevButton.addEventListener('click', slideTrainersToPrevious);

var initialPointTrainers;
var finalPointTrainers;
document.addEventListener('touchstart', function (evt) {
  evt.stopPropagation();
  initialPointTrainers = evt.changedTouches[0];
}, false);

document.addEventListener('touchend', function (evt) {
  evt.stopPropagation();
  finalPointTrainers = evt.changedTouches[0];
  var xAbs = Math.abs(initialPointTrainers.pageX - finalPointTrainers.pageX);
  var yAbs = Math.abs(initialPointTrainers.pageY - finalPointTrainers.pageY);
  if (evt.target.closest('section') === trainersNode) {
    if (xAbs > 20 || yAbs > 20) {
      if (finalPointTrainers.pageX < initialPointTrainers.pageX) {
        slideTrainersToNext();
      } else {
        slideTrainersToPrevious();
      }
    }
  }

}, false);
