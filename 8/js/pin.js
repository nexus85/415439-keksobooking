'use strict';
(function () {
//  var showCard = window.showCard.openPopup;
  var fragment = document.createDocumentFragment();
  /**
  * @function createPins function creates Pins.
  */

  var createPin = function (newAd, i) {
    var pinY = 40; // pin height in px
    //  var totalAds = 8;
    var template = document.querySelector('template');
    var pinTemplate = template.content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    var image = pin.getElementsByTagName('img')[0];
    pin.setAttribute('style', 'left:' + newAd.location.x + 'px;' + 'top:' + (newAd.location.y + pinY) + 'px;');
    //  pin.setAttribute('data-id', i);
    pin.dataset.Id = i;
    image.setAttribute('src', newAd. author.avatar);
    pin.addEventListener('click', function () {
      window.showCard.openPopup(newAd);
    });
    return pin;
  };

  var createPins = function (adsArray) {
    for (var i = 0; i < adsArray.length; i++) {
      fragment.appendChild(createPin(adsArray[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };
  var selectedPin;
  // parent container
  var container = document.querySelector('.map__pins');
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
  //  var popup = document.querySelector('.popup');
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
  }
  window.pin = {
    createPins: createPins,
  };
})();
