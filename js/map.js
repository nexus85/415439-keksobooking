'use strict';

document.querySelector('.map').classList.remove('map--faded');

var getRandomValue = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};
//var offer = [title, address, price, type, guests, checkin, checkout, features, description];
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var type = ['flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var address = [''];
var price = [''];
var guests = [''];
var description = ['Java script SUCKS!'];

var locationX;
var locationY;
var bookingItems = [];
var totalAds = 8;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createBookingItemsArray(totalItems) {
  for (var i = 0; i < totalItems; i++) {
    bookingItems.push({});
    bookingItems[i].title = title[Math.floor(Math.random() * title.length)];
    bookingItems[i].locationX = getRandomValue(300, 900);
    bookingItems[i].locationY = getRandomValue(100, 500);
    bookingItems[i].avatar = 'img/avatars/user0' + avatars[Math.floor(Math.random() * avatars.length)] + '.png';
  }
}

createBookingItemsArray(totalAds);
//createButtons(totalAds);

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i < totalAds; i++) {
  var addButton = document.createElement('button');
  addButton.setAttribute('class', 'map__pin');
  addButton.setAttribute('style', 'left:' + bookingItems[i].locationX + 'px;' + 'top:' + bookingItems[i].locationY + 'px;');
  addButton.innerHTML = '<img width="40" height="40" draggable="false">';
  addButton.querySelector('img').setAttribute('src', bookingItems[i].avatar);
  fragment.appendChild(addButton);
}
mapPins.appendChild(fragment);

var template = document.querySelector('template').content.querySelector('article.map__card');

var newCards = document.createElement('article');
newCards.classList.add('map__card', 'popup');
var before = document.querySelector('.map__filters-container');
var nodeParent = before.parentNode;
nodeParent.insertBefore(newCards, before);

var popupElement = document.querySelector('.map__card').cloneNode(true);
popupElement.querySelector('h3').textContent = bookingItems[i].title;
