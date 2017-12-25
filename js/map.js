'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var LOCATION_Y_LIMITS = {
    min: 100,
    max: 500
  };
  var LOCATION_X_LIMITS = {
    min: 40,
    max: 1150
  };
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_WIDTH = 62;
  var ARROW_HEIGHT = 10;
  var mainPin = document.querySelector('.map__pin--main');
  var userPopup = document.querySelector('.map');
  var addressInput = document.querySelector('#address');
  var coordinateX = mainPin.offsetLeft;
  var coordinateY = mainPin.offsetTop;
  var cardsArray = [];
  addressInput.value = 'x: ' + (coordinateX + MAIN_PIN_WIDTH / 2) + ', y: ' + (coordinateY + MAIN_PIN_HEIGHT + ARROW_HEIGHT);
  /**
  * function  activateMap form and map activates on mouseup
  */
  function activateMapHandler() {
    userPopup.classList.remove('map--faded');
    window.backend.load(contentLoadHandler, window.backend.errorMessage);
    mainPin.removeEventListener('keydown', activateMapOnEnterHandler);
    mainPin.removeEventListener('mouseup', activateMapHandler);
    window.form.activateForm();
  }
  // drag and drop
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      coordinateX = mainPin.offsetLeft - shift.x;
      coordinateY = mainPin.offsetTop - shift.y;
      // sets X boundries
      if (coordinateX < LOCATION_X_LIMITS.min) {
        mainPin.style.left = LOCATION_X_LIMITS.min + 'px';
      } else if (coordinateX > LOCATION_X_LIMITS.max) {
        mainPin.style.left = LOCATION_X_LIMITS.max + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      // sets Y boundries
      if (coordinateY < LOCATION_Y_LIMITS.min) {
        mainPin.style.top = LOCATION_Y_LIMITS.min + 'px';
      } else if (coordinateY > LOCATION_Y_LIMITS.max) {
        mainPin.style.top = LOCATION_Y_LIMITS.max + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      // coordinates goes to input 'address'
      addressInput.value = 'x: ' + (coordinateX + MAIN_PIN_WIDTH / 2) + ', y: ' + (coordinateY + MAIN_PIN_HEIGHT + ARROW_HEIGHT);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
  // form and map activates on mouseup
  mainPin.addEventListener('mouseup', activateMapHandler);
  // map activates when enter pressed
  var activateMapOnEnterHandler = function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      activateMapHandler();
    }
  };
  mainPin.addEventListener('keydown', activateMapOnEnterHandler);

  /**
  * function contentLoadHandler works if download from server was succesfull
  * @param {array} data data we received from server
  */
  var contentLoadHandler = function (data) {
    cardsArray = data;
    var filterForm = document.querySelector('.map__filters');
    filterForm.addEventListener('change', function () {
      window.debounce(window.pin.renderPins(cardsArray));
    });
    window.pin.renderPins(cardsArray);
  };
  window.map = {
    mainPin: mainPin,
    address: addressInput
  };
})();
