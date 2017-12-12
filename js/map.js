'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var mainPin = document.querySelector('.map__pin--main');
  var newAd = window.data.newAd;
  var generateCard = window.generateCard;

  var userPopup = document.querySelector('.map');

  /**
  * @function  activateMap form and map activates on mouseup
  */

  function activateMap() {
    userPopup.classList.remove('map--faded');
    window.createPins(newAd, generateCard);
    window.form.activateForm();
  }
  // form and map activates on mouseup
  mainPin.addEventListener('mouseup', activateMap);

  // map activates when enter pressed
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      activateMap();
    }
  });
})();
