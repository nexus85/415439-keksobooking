'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var mainPin = document.querySelector('.map__pin--main');
  var newAd = window.data.newAd;
  var showCard = window.showCard;
  var locationY = {
    min: 100,
    max: 500
  };

  var locationX = {
    min: 40,
    max: 1150
  };

  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_WIDTH = 62;
  var ARROW_HEIGHT = 10;

  var userPopup = document.querySelector('.map');
  var addressInput = document.querySelector('#address');

  /**
  * @function  activateMap form and map activates on mouseup
  */

  function activateMap() {
    userPopup.classList.remove('map--faded');
    window.createPins(newAd, showCard);
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

        var coordinateY = mainPin.offsetTop - shift.y;
        var coordinateX = mainPin.offsetLeft - shift.x;

        // sets Y boundries
        if (coordinateY < locationY.min) {
          mainPin.style.top = locationY.min + 'px';
        } else if (coordinateY > locationY.max) {
          mainPin.style.top = locationY.max + 'px';
        } else {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }

        // sets X boundries
        if (coordinateX < locationX.min) {
          mainPin.style.left = locationX.min + 'px';
        } else if (coordinateX > locationX.max) {
          mainPin.style.left = locationX.max + 'px';
        } else {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
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
  mainPin.addEventListener('mouseup', activateMap);

  // map activates when enter pressed
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      activateMap();
    }
  });

})();
