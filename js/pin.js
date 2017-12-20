'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  /**
  * function createPins function creates Pin.
  * @param {array} newAds remote data array from server
  * @param {number} i number of element in array
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
      var oldPopup = document.querySelector('.popup');
      if (oldPopup) {
        oldPopup.parentNode.removeChild(oldPopup);
      }
      window.showCard.openPopup(newAds);
    });
    return pin;
  };
  /**
  * function renderPins function renders pins and appends it into html document
  * @param {array} cardsArray
  */
  var renderPins = function (cardsArray) {
    for (var i = 0; i < cardsArray.length; i++) {
      fragment.appendChild(createPin(cardsArray[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  // function responsible for switches classes between pins.
  var container = document.querySelector('.map__pins'); // parent container
  container.addEventListener('click', function (event) {
    var target = event.target;
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
  var selectedPin;

  /**
  * switchClasses function switches classes when pin activated.
  * @param {target} pin selected pin
  */
  function switchClasses(pin) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = pin;
    selectedPin.classList.add('map__pin--active');
  }
  window.pin = {
    createPins: renderPins,
  };
})();
