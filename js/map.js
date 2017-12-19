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
  //  var newAd = window.data.newAd;
  // var showCard = window.showCard;
  var userPopup = document.querySelector('.map');
  var addressInput = document.querySelector('#address');

  /**
  * @function  activateMap form and map activates on mouseup
  */

  function activateMapHandler() {
    userPopup.classList.remove('map--faded');
    window.backend.load(onLoad);
    mainPin.removeEventListener('keydown', activateMapOnEnterHandler);
    mainPin.removeEventListener('mouseup', activateMapHandler);
    window.form.activateForm();
    // drag and drop!!!
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var coordinateX = mainPin.offsetLeft - shift.x;
        var coordinateY = mainPin.offsetTop - shift.y;
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

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  // form and map activates on mouseup
  mainPin.addEventListener('mouseup', activateMapHandler);
  // map activates when enter pressed
  var activateMapOnEnterHandler = function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      activateMapHandler();
    }
  };
  mainPin.addEventListener('keydown', activateMapOnEnterHandler);

  // backend!!!!!!!!!!!!!
  var onLoad = function (data) {
    window.pin.createPins(data);
  };
// ////////////////////////////
})();
