'use strict';
//  Validation
(function () {
  var MAIN_PIN_RESET_LEFT = 50 + '%';
  var MAIN_PIN_RESET_TOP = 375 + 'px';
  var DEFAULT_AVATAR_SRC = 'img/muffin.png';
  var ADDRESS_VALUE_X = 630;
  var ADDRESS_VALUE_Y = 447;
  // arrays for validation
  var accomodationTypes = [
    'bungalo',
    'flat',
    'house',
    'palace'
  ];
  var prices = [
    '0',
    '1000',
    '5000',
    '10000'
  ];
  var capacity = [
    '1',
    '2',
    '3',
    '0'
  ];
  var numberOfRooms = [
    '1',
    '2',
    '3',
    '100'
  ];
  var checkinTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var checkoutTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  // makes form disabled
  var form = document.querySelector('.map__filters');
  form.classList.add('notice__form--disabled');
  var fieldsetFilter = document.querySelector('.map__filter-set');
  fieldsetFilter.disabled = true;
  var fieldsetNotice = document.querySelector('.notice__header');
  fieldsetNotice.disabled = true;
  var noticeForm = document.querySelector('.notice__form');
  var cleanForm = noticeForm.querySelector('.form__reset');
  // makes disabled all fieldsets
  var formElement = document.querySelectorAll('.form__element');
  for (var k = 0; k < formElement.length; k++) {
    formElement[k].disabled = true;
  }

  // activates form
  var activateForm = function () {
    fieldsetNotice.disabled = false;
    fieldsetFilter.disabled = false;
    noticeForm.classList.remove('notice__form--disabled');
    form.classList.remove('notice__form--disabled');
    for (k = 0; k < formElement.length; k++) {
      formElement[k].disabled = false;
    }
  };


  // Validation ///////////////
  // sync all fields from the beginning
  var synchronizeFields = function () {
    window.synchronizeFields(timeIn, timeOut, checkinTimes, checkoutTimes, syncValues);
    window.synchronizeFields(timeOut, timeIn, checkinTimes, checkoutTimes, syncValues);
    window.synchronizeFields(typeSelect, priceSelect, accomodationTypes, prices, syncValueWithMin);
    window.synchronizeFields(roomsSelect, guestsSelect, numberOfRooms, capacity, syncRoomsAndGuests);
  };
  // 4.2.2.1 sync for checkin and checkout
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  // sync checkin and checkout
  var syncValues = function (element, value) {
    element.value = value;
  };
  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, checkinTimes, checkoutTimes, syncValues);
  });
  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, checkinTimes, checkoutTimes, syncValues);
  });


  // 4.2.2.2 sync for type and price
  var typeSelect = noticeForm.querySelector('#type');
  var priceSelect = noticeForm.querySelector('#price');
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  typeSelect.addEventListener('change', function () {
    window.synchronizeFields(typeSelect, priceSelect, accomodationTypes, prices, syncValueWithMin);
  });

  // 4.2.2.3 sync for rooms and guests
  var roomsSelect = noticeForm.querySelector('#room_number');
  var guestsSelect = noticeForm.querySelector('#capacity');
  roomsSelect.addEventListener('change', function () {
    window.synchronizeFields(roomsSelect, guestsSelect, numberOfRooms, capacity, syncRoomsAndGuests);
  });
  var titleForm = noticeForm.querySelector('#title');
  var priceForm = noticeForm.querySelector('#price');

  /**
  * function  generateBorder function generates border
  * @param {object} element invalid object
  */
  var generateBorder = function (element) {
    element.style.outlineWidth = '2px';
    element.style.outlineColor = 'red';
  };

  /**
  * function  generateBorder function resets border
  * @param {object} element valid object
  */
  var resetBorder = function (element) {
    element.style.outlineWidth = '';
    element.style.outlineColor = '';
  };

  /**
  * function  checkTitleValidityHandler function checks title validity
  */
  var checkTitleValidityHadler = function () {
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
  titleForm.addEventListener('keydown', checkTitleValidityHadler);

  /**
  * function  checkTitleValidityHandler function checks price validity
  */
  var checkPriceValidityHandler = function () {
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

  priceForm.addEventListener('change', checkPriceValidityHandler);

  /**
  * function syncRoomsAndGuests syncs rooms with guests
  * @param {Node} guestsOption selected field
  * @param {string} numberOfGuests value
  */
  var syncRoomsAndGuests = function (guestsOption, numberOfGuests) {
    guestsOption.value = numberOfGuests;
    var currentValue = guestsOption.value;
    Array.from(guestsOption.options).forEach(function (option) {
      option.disabled = true;
      if (option.value === currentValue && currentValue === '0') { // not for guests
        option.disabled = false;
      }
      if (option.value <= currentValue && option.value !== '0') {
        option.disabled = false;
      }
    });
  };
  /**
  * function resetForm resets valid form and shows popup for limited time.
  */
  var resetForm = function () {
    noticeForm.reset();
    window.map.mainPin.style.left = MAIN_PIN_RESET_LEFT;
    window.map.mainPin.style.top = MAIN_PIN_RESET_TOP;
    window.map.address.value = 'x: ' + ADDRESS_VALUE_X + ', y: ' + ADDRESS_VALUE_Y;
    synchronizeFields();
    window.pictures.avatar.src = DEFAULT_AVATAR_SRC;
    window.pictures.clear(window.pictures.photoElements);
  };

  // form saves data on server
  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.save(new FormData(noticeForm), resetForm, window.backend.errorMessage);
  });
  cleanForm.addEventListener('click', function (event) {
    event.preventDefault();
    resetForm();
  });
  window.form = {
    syncFields: synchronizeFields,
    activateForm: activateForm
  };
})();
