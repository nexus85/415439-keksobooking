'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var formFilter = document.querySelector('.map__filters');
  var housingFeatures = formFilter.querySelector('#housing-features');
  var features = housingFeatures.querySelectorAll('input[type="checkbox"]');


  // function getPriceRange converts numbers to words
  var getPriceRange = function (price) {
    if (price < LOW_PRICE) {
      return 'low';
    } else if (price > HIGH_PRICE) {
      return 'high';
    }
    return 'middle';
  };

  // function filterCards filters cards based on users choice
  var filterCards = function (card) {
    var housingType = formFilter.querySelector('select[name=housing-type]').value;
    var housingGuests = formFilter.querySelector('select[name=housing-guests]').value;
    var housingRooms = formFilter.querySelector('select[name=housing-rooms]').value;
    var housingPrice = formFilter.querySelector('select[name=housing-price]').value;
    for (var k in features) {
      if (features.hasOwnProperty(k)) {
        var feature = features[k];
        if (feature.checked && !card.offer.features.includes(feature.value)) {
          return false;
        }
      }
    }
    return (housingType === 'any' || card.offer.type === housingType)
      && (housingGuests === 'any' || card.offer.guests === +housingGuests)
      && (housingRooms === 'any' || card.offer.rooms === +housingRooms)
      && (housingPrice === 'any' || housingPrice === getPriceRange(card.offer.price));
  };

  window.filter = {
    cards: filterCards,
    formFilter: formFilter
  };
})();
