'use strict';

// function returns a random value.
var getRandomValue = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

// arrays
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var template = document.querySelector('template').content.querySelector('.map__card');
var bookingItems = [];
var totalAds = 8;

// function makes the random elements unique.
function noRepeat(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
}

// function creates an array of items available for booking.
function createBookingItemsArray(totalItems) {
  for (var i = 0; i < totalItems; i++) {
    bookingItems.push({});
    bookingItems[i].author = {};
    bookingItems[i].author.avatar = 'img/avatars/user0' + noRepeat(avatars) + '.png';
    bookingItems[i].offer = {};
    bookingItems[i].offer.title = noRepeat(title);
    bookingItems[i].offer.price = getRandomValue(1000, 1000000).toFixed(0);
    bookingItems[i].offer.type = type[Math.floor(Math.random() * type.length)];
    bookingItems[i].offer.rooms = getRandomValue(1, 5).toFixed(0);
    bookingItems[i].offer.guests = getRandomValue(1, 8).toFixed(0);
    bookingItems[i].offer.checkin = checkin[Math.floor(Math.random() * checkin.length)];
    bookingItems[i].offer.checkout = checkout[Math.floor(Math.random() * checkout.length)];
    bookingItems[i].offer.features = noRepeat(features);
    bookingItems[i].offer.description = 'description';
    bookingItems[i].offer.photos = [];
    bookingItems[i].location = {};
    bookingItems[i].location.x = getRandomValue(300, 900);
    bookingItems[i].location.y = getRandomValue(100, 500);
    bookingItems[i].offer.address = bookingItems[i].location.x + ', ' + bookingItems[i].location.y;
  }
}

createBookingItemsArray(totalAds);

// creates Pins
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i < totalAds; i++) {
  var addButton = document.createElement('button');
  addButton.setAttribute('class', 'map__pin');
  addButton.setAttribute('style', 'left:' + bookingItems[i].location.x + 'px;' + 'top:' + bookingItems[i].location.y + 'px;');
  addButton.innerHTML = '<img width="40" height="40" draggable="false">';
  addButton.querySelector('img').setAttribute('src', bookingItems[i]. author.avatar);
  fragment.appendChild(addButton);
}
mapPins.appendChild(fragment);

// function returns russian language;
function russianLanguage(russianType) {

  var houseType = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  return houseType[russianType];
}

// removes '.map--faded' class from the map.
var userPopup = document.querySelector('.map');
userPopup.classList.remove('map--faded');


var card = document.body.appendChild(template.cloneNode(true)); // new card element from template
var popupUl = card.querySelector('.popup__features');
var before = document.querySelector('.map__filters-container');
var nodeParent = before.parentNode;
nodeParent.insertBefore(card, before); // inserts card before .map__filters-container:

// creates a new card based on first element from bookingItems array.

card.querySelector('h3').textContent = bookingItems[0].offer.title;
card.querySelector('small').textContent = bookingItems[0].offer.address;
card.querySelector('.popup__price').textContent = bookingItems[0].offer.price + '&#x20bd;/ночь';
card.querySelector('h4').textContent = russianLanguage(bookingItems[0].offer.type);
card.getElementsByTagName('p')[2].textContent = bookingItems[0].offer.rooms + ' комнаты для ' + bookingItems[0].offer.guests + ' гостей';
card.getElementsByTagName('p')[3].textContent = 'Заезд после ' + bookingItems[0].offer.checkin + ', выезд до ' + bookingItems[0].offer.checkout;
card.getElementsByTagName('p')[4].textContent = bookingItems[0].offer.description;
card.querySelector('.popup__avatar').src = bookingItems[0].author.avatar;

// creates a list and inserts it into the ".popup__features".
popupUl.innerHTML = '';
for (var i = 0; i < 6; i++) {
  var list = '<li class="feature feature--' + bookingItems[i].offer.features + '"></li>';
  popupUl.insertAdjacentHTML('afterbegin', list);
}
