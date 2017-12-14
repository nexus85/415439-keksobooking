'use strict';
window.pin = (function () {
/**
* @function createPins function creates Pins.
*/

  window.createPins = function (newAd, showCard) {
    var pinY = 40; // pin height in px
    var totalAds = 8;
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var templatePin = document.querySelector('template').content.querySelector('.map__pin');
    for (var i = 0; i < totalAds; i++) {
      var pin = mapPins.appendChild(templatePin.cloneNode(true));
      var image = pin.getElementsByTagName('img')[0];
      pin.setAttribute('style', 'left:' + newAd[i].location.x + 'px;' + 'top:' + (newAd[i].location.y + pinY) + 'px;');
      pin.setAttribute('data-id', i);
      image.setAttribute('src', newAd[i]. author.avatar);
      pin.addEventListener('click', showCard);
      fragment.appendChild(pin);
      mapPins.appendChild(fragment);
    }
  };
  var selectedPin;
  // parent container
  var container = document.querySelector('.map__pins');

  /**
  * @function  addEventListener function shows advertisement adn switches classes when pin activated.
    @param {object} event - event
  */
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
  var popup = document.querySelector('.popup');
  /**
  * @function  switchClasses function switches classes when pin activated.
  this function goes up to onclick!
  */

  function switchClasses(pin) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = pin;
    selectedPin.classList.add('map__pin--active');
    popup.classList.remove('hidden');
  }
})();
