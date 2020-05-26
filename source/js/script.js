'use strict';

var togglesBlock = document.querySelector('.controls');
var toggles = document.querySelectorAll('.controls__button');
var planes = document.querySelectorAll('.planes__list');
var firstPlan = document.querySelector('.planes__list--first');
var secondPlan = document.querySelector('.planes__list--second');
var thirdPlan = document.querySelector('.planes__list--third');
var phoneField = document.querySelector('#phone');

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

