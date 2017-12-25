'use strict';
(function () {
  var formFilter = document.querySelector('.map__filters');

  // function getPriceRange converts numbers to words
  var getPriceRange = function (price) {
    if (price < 10000) {
      return 'low';
    } else if (price > 50000) {
      return 'high';
    }
    return 'middle';
  };


  // function filterCards filters cards based on users choice
  var filterCards = function (card) {
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

  window.filter = {
    filterCards: filterCards,
    formFilter: formFilter
  };
})();
