'use strict';
(function () {

  // arrays
  var title = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var type = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var checkin = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var checkout = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var totalAds = 8; // total Ads
  var newAd = []; //

  /**
* @function createBookingItems function creates an array of items available for booking.
  @param {number} totalItems - total number of existing advertisements.
*/

  function createBookingItems(totalItems) {
    var cards = [];
    for (var i = 0; i < totalItems; i++) {
      var locationX = window.getRandomValue(300, 900);
      var locationY = window.getRandomValue(100, 500);
      cards[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.generateNoRepeatValue(title),
          price: window.getRandomValue(1000, 1000000).toFixed(0),
          type: type[window.generateNoRepeatValue(Object.keys(type))],
          rooms: window.getRandomValue(1, 5).toFixed(0),
          guests: window.getRandomValue(1, 8).toFixed(0),
          checkin: checkin[Math.floor(Math.random() * checkin.length)],
          checkout: checkout[Math.floor(Math.random() * checkout.length)],
          features: window.generateNoRepeatValue(features),
          description: 'description',
          address: locationX + ' ' + locationY,
          photos: [],
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
    return cards;
  }
  newAd = createBookingItems(totalAds);
  window.data = {
    newAd: newAd
  };
})();
