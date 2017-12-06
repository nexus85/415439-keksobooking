'use strict';

// function returns a random value.
var getRandomValue = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
var type = ['flat',
  'house',
  'bungalo'
];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var template = document.querySelector('template').content.querySelector('.map__card');
var totalAds = 8; // total Ads
var newAd = []; //

/**
* @function generateNoRepeatNumber function makes the random elements unique.
  @param {array} array we work with
*/

function generateNoRepeatNumber(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
}


/**
* @function createBookingItemsArray function creates an array of items available for booking.
  @param {number} totalAds - total number of existing advertisements.
  @param {array} newAd - array of new advertisements.
*/
createBookingItemsArray(totalAds, newAd);
function createBookingItemsArray(totalItems, bookingItems) {
  for (var i = 0; i < totalItems; i++) {
    bookingItems[i] = {
      author: {
        avatar: 'img/avatars/user0' + generateNoRepeatNumber(avatars) + '.png'
      },
      offer: {
        title: generateNoRepeatNumber(title),
        price: getRandomValue(1000, 1000000).toFixed(0),
        type: type[Math.floor(Math.random() * type.length)],
        rooms: getRandomValue(1, 5).toFixed(0),
        guests: getRandomValue(1, 8).toFixed(0),
        checkin: checkin[Math.floor(Math.random() * checkin.length)],
        checkout: checkout[Math.floor(Math.random() * checkout.length)],
        features: generateNoRepeatNumber(features),
        description: 'description',
        photos: [],
      },
      location: {
        x: getRandomValue(300, 900),
        y: getRandomValue(100, 500)
      }
    };
  }
}

/**
* @function createPins function creates Pins.
*/
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
function createPins() {
  for (var i = 0; i < totalAds; i++) {
    var addButton = document.createElement('button');
    var addImage = new Image(40, 40);
    addImage.draggable = false;
    addButton.setAttribute('class', 'map__pin');
    addButton.setAttribute('style', 'left:' + newAd[i].location.x + 'px;' + 'top:' + newAd[i].location.y + 'px;');
    addImage.setAttribute('src', newAd[i]. author.avatar);
    addButton.appendChild(addImage);
    fragment.appendChild(addButton);
  }
}

// function returns russian language;
function russianLanguage(russianType) {

  var houseType = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  return houseType[russianType];
}

var userPopup = document.querySelector('.map');
var card = document.body.appendChild(template.cloneNode(true)); // new card element from template
var popupUl = card.querySelector('.popup__features');
var before = document.querySelector('.map__filters-container');
var nodeParent = before.parentNode;
nodeParent.insertBefore(card, before); // inserts card before .map__filters-container:

// creates a new card based on first element from bookingItems array.

card.querySelector('h3').textContent = newAd[0].offer.title;
card.querySelector('small').textContent = newAd[0].offer.address;
card.querySelector('.popup__price').textContent = newAd[0].offer.price + '\u20bd/ночь';
card.querySelector('h4').textContent = russianLanguage(newAd[0].offer.type);
card.getElementsByTagName('p')[2].textContent = newAd[0].offer.rooms + ' комнаты для ' + newAd[0].offer.guests + ' гостей';
card.getElementsByTagName('p')[3].textContent = 'Заезд после ' + newAd[0].offer.checkin + ', выезд до ' + newAd[0].offer.checkout;
card.getElementsByTagName('p')[4].textContent = newAd[0].offer.description;
card.querySelector('.popup__avatar').src = newAd[0].author.avatar;
popupUl.innerHTML = '';
popupUl.appendChild(createFeaturesList(newAd[0].offer.features));

/**
* @function createFeaturesList creates a list and inserts it into the ".popup__features".
*/

function createFeaturesList() {
  var totalFeatures = getRandomValue(1, 6);
  var featuresDocFragment = document.createDocumentFragment();

  for (var k = 0; k < totalFeatures; k++) {
    var featureTag = document.createElement('li');
    featureTag.className = 'feature  feature--' + newAd[k].offer.features;
    featuresDocFragment.appendChild(featureTag);
  }
  return featuresDocFragment;
}

// makes form disabled
var form = document.querySelector('.map__filters');
form.classList.add('notice__form--disabled');
var fieldsetFilter = document.querySelector('.map__filter-set');
fieldsetFilter.disabled = true;
var fieldsetNotice = document.querySelector('.notice__header');
fieldsetNotice.disabled = true;
var noticeForm = document.querySelector('.notice__form');
// makes disabled all fieldsets
var formElement = document.querySelectorAll('.form__element');
for (var k = 0; k < formElement.length; k++) {
  formElement[k].disabled = true;
}

var mainPin = document.querySelector('.map__pin--main');
// form and map activates on mouseup
mainPin.addEventListener('mouseup', activateMap);

/**
* @function  activateMap form and map activates on mouseup
*/

function activateMap() {
  userPopup.classList.remove('map--faded');
  for (k = 0; k < formElement.length; k++) {
    formElement[k].disabled = false;
  }
  createPins();
  fieldsetNotice.disabled = false;
  fieldsetFilter.disabled = false;
  noticeForm.classList.remove('notice__form--disabled');
  form.classList.remove('notice__form--disabled');
  mapPins.appendChild(fragment);
}

// main pin activates when enter pressed
mainPin.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});


// popup hidden by default
var popup = document.querySelector('.popup');
popup.classList.add('hidden');


/**
* @function  closeAd function closes popup.
*/

function closeAd() {
  popup.classList.add('hidden');
}

var selectedPin;
// parent container
var container = document.querySelector('.map__pins');

/**
* @function  onclick function shows advertisement adn switches classes when pin activated.
  @param {object} event - event
*/

container.onclick = function (event) {
  var target = event.target;
  // cycle goes up from target to parent and container
  while (target !== container) {
    if (target.className === 'map__pin' && target.className !== 'map__pin--main') {
      // found our element
      addClass(target);
      return;
    }
    target = target.parentNode;
  }
};

/**
* @function  addClass function switches classes when pin activated.
this function goes up to onclick!
*/

function addClass(node) {
  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
    closeAd();
  }
  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
  popup.classList.remove('hidden');
}


var closePopup = document.querySelector('.popup__close');
// removes active class
/**
* @function  removeActiveClass function removes active class.
*/

var removeActiveClass = function () {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};


/**
* @function  closePinInfo function removes active class and closes popup.
*/

var closePinInfo = function () {
  removeActiveClass();
  popup.classList.add('hidden');
};

// event listeners for popup__close
closePopup.addEventListener('click', closePinInfo);
closePopup.addEventListener('click', closeAd);

/**
* @function  popup closes when esc pressed
*/

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popup.classList.add('hidden');
    removeActiveClass();
  }
});

// Validation ////////////////
// 4.2.2.1 sync for checkin and checkout
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
function synchroniseTimeIn() {
  timeIn.value = timeOut.value;
  return timeOut.value;
}
function synchroniseTimeOut() {
  timeOut.value = timeIn.value;
  return timeIn.value;
}

timeIn.addEventListener('change', synchroniseTimeOut);
timeOut.addEventListener('change', synchroniseTimeIn);

// 4.2.2.2 sync for type and price
var typeSelect = noticeForm.querySelector('#type');
var priceSelect = noticeForm.querySelector('#price');
function synchroniseTypeAndPrice() {
  var newValue = typeSelect.value;
  switch (newValue) {
    case 'bungalo': priceSelect.min = 0;
      break;
    case 'flat': priceSelect.min = 1000;
      break;
    case 'house': priceSelect.min = 5000;
      break;
    case 'palace': priceSelect.min = 10000;
      break;
  }
}
typeSelect.addEventListener('change', synchroniseTypeAndPrice);

// 4.2.2.3 sync for rooms and guests
var roomsSelect = noticeForm.querySelector('#room_number');
var guestsSelect = noticeForm.querySelector('#capacity');
function synchroniseRoomsAndGuests() {
  var newValue = roomsSelect.value;
  switch (newValue) {
    case '1': guestsSelect.value = 1;
      break;
    case '2': guestsSelect.value = 2;
      break;
    case '3': guestsSelect.value = 3;
      break;
    case '100': guestsSelect.value = 0;
      break;
  }
}
roomsSelect.addEventListener('change', synchroniseRoomsAndGuests);

//  Validation
// var formSubmit = noticeForm.querySelector('.form__submit');
var addressForm = noticeForm.querySelector('#address');
var titleForm = noticeForm.querySelector('#title');
var priceForm = noticeForm.querySelector('#price');

var generateBorder = function (element) {
  element.style.borderWidth = '2px';
  element.style.borderColor = 'red';
};

var resetBorder = function (element) {
  element.style.borderWidth = '';
  element.style.borderColor = '';
};

var checkTitleValidity = function () {
  generateBorder(titleForm);
  if (titleForm.validity.tooShort) {
    titleForm.setCustomValidity('Заголовок должен быть не менее 30-ти символов');
  } else if (titleForm.validity.tooLong) {
    titleForm.setCustomValidity('Заголовок не должен быть не более 100 символов');
  } else if (titleForm.validity.valueMissing) {
    titleForm.setCustomValidity('Обязательное поле');
  } else {
    titleForm.setCustomValidity('');
    resetBorder(titleForm);
  }
};
titleForm.addEventListener('invalid', checkTitleValidity);

var checkPriceValidity = function () {
  generateBorder(priceForm);
  if (priceForm.validity.rangeUnderflow) {
    priceForm.setCustomValidity('Цена не соответсвует выбраннному типу жилья. Пожалуйста, повысьте диапозон или укажите другой тип размещения');
  } else if (priceForm.validity.rangeOverflow) {
    priceForm.setCustomValidity('Стоимость жилья выше рекомендуемой');
  } else {
    priceForm.setCustomValidity('');
    resetBorder(priceForm);
  }
};

priceForm.addEventListener('invalid', checkPriceValidity);
addressForm.style = 'pointer-events: none;';
var checkAddressValidity = function () {
  if (addressForm.validity.valueMissing) {
    addressForm.setCustomValidity('Поле адреса не может быть пустым');
    generateBorder(addressForm);
  } else {
    resetBorder(addressForm);
  }
};

addressForm.addEventListener('invalid', checkAddressValidity);
