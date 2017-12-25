'use strict';
(function () {
  var MAX_PINS_NUMBER = 5;
  var fragment = document.createDocumentFragment();
  var selectedPin;
  /**
  * function createPins function creates Pin.
  * @param {array} newAds remote data array from server
  * @param {number} i number of an element in array
  * @return {element} created pin
  */
  var createPin = function (newAds, i) {
    var pinY = 40; // pin height in px
    var template = document.querySelector('template');
    var pinTemplate = template.content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    var image = pin.getElementsByTagName('img')[0];
    pin.setAttribute('style', 'left:' + newAds.location.x + 'px;' + 'top:' + (newAds.location.y + pinY) + 'px;');
    pin.dataset.Id = i;
    image.setAttribute('src', newAds.author.avatar);
    pin.addEventListener('click', function () { // event listener for click on pin
      closeOldPopup(); // closes existing popup
      window.showCard.openPopup(newAds);
    });
    return pin;
  };
  /**
  * function closeOldPopup closes old popup
  */
  var closeOldPopup = function () {
    var oldPopup = document.querySelector('.popup');
    if (oldPopup) {
      oldPopup.parentNode.removeChild(oldPopup);
    }
  };
  /**
  * function renderPins function renders pins and appends it into html document
  * @param {array} cardsArray
  */
  var renderPins = function (cardsArray) {
    removePins();
    closeOldPopup();
    var filteredCards = []; // array for filtered cards
    for (var i = 0; i < cardsArray.length; i++) {
      if (window.filter.filterCards(cardsArray[i])) {
        filteredCards.push(cardsArray[i]);
      }
    }
    filteredCards.slice(0, MAX_PINS_NUMBER).forEach(function (pin, index) {
      fragment.appendChild(createPin(pin, index));
    });
    document.querySelector('.map__pins').appendChild(fragment);
  };
  /**
  * function removePins removes all pins before creating new pins from new array
  */
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    var mainPin = document.querySelector('.map__pin--main');
    pins.forEach(function (it) {
      if (it !== mainPin) {
        it.remove();
      }
    });
  };

  // function responsible for switches classes between pins.
  var container = document.querySelector('.map__pins'); // parent container
  container.addEventListener('click', function (evt) {
    var target = evt.target;
    // cycle goes up from target to parent and container
    while (target !== container) {
      if (target.className === 'map__pin' && target.className !== 'map__pin--main') {
        // found our element
        switchClasses(target);
        return;
      }
      target = target.parentNode;
    }
  });

  /**
  * switchClasses function switches classes when pin activated.
  * @param {target} pin selected pin
  */
  var switchClasses = function (pin) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = pin;
    selectedPin.classList.add('map__pin--active');
  };
  window.pin = {
    renderPins: renderPins,
  };
})();
