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
    image.setAttribute('src', newAd.author.avatar);
    pin.addEventListener('click', function () {
      window.showCard.openPopup(newAd);
    });
    return pin;
  };

  var createPins = function (cardsArray) {
    for (var i = 0; i < cardsArray.length; i++) {
      fragment.appendChild(createPin(cardsArray[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.pin = {
    createPins: createPins,
  };
})();
