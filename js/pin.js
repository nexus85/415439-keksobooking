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
    removePins();
    var filteredCards = [];
    //    console.log(cardsArray);
    for (var i = 0; i < cardsArray.length; i++) {
      if (iCanSeeIt(cardsArray[i])) {
        filteredCards.push(cardsArray[i]);
      }
    }
    filteredCards.slice(0, 5).forEach(function (pin, index) {
      fragment.appendChild(createPin(pin, index));
    });
    document.querySelector('.map__pins').appendChild(fragment);
  };
  var getPriceRange = function (price) {
    if (price < 10000) {
      return 'low';
    } else if (price > 50000) {
      return 'high';
    }
    return 'middle';
  };


  var iCanSeeIt = function (card) {
    var formFilter = document.querySelector('.map__filters');
    var housingType = formFilter.querySelector('select[name=housing-type]').value;
    var housingGuests = formFilter.querySelector('select[name=housing-guests]').value;
    var hounsingRooms = formFilter.querySelector('select[name=housing-rooms]').value;
    var housingPrice = formFilter.querySelector('select[name=housing-price]').value;
    var housingFeatures = formFilter.querySelector('#housing-features');
    var features = housingFeatures.querySelectorAll('input[type="checkbox"]');
    if (housingType !== 'any' && housingType !== card.offer.type) {
      return false;
    }
    if (housingGuests !== 'any' && housingGuests !== card.offer.guests.toString()) {
      return false;
    }
    if (hounsingRooms !== 'any' && hounsingRooms !== card.offer.rooms.toString()) {
      return false;
    }
    if (housingPrice !== 'any' && housingPrice !== getPriceRange(card.offer.price)) {
      return false;
    }
    for (var k in features) {
      if (features.hasOwnProperty(k)) {
        var feature = features[k];
        if (feature.checked && card.offer.features.includes(feature.value) !== true) {
          return false;
        }
      }
    }
    return true;
  };


  // removes all pins before creating new pins from new array
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
