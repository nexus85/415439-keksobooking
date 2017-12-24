'use strict';
//  Validation
(function () {
  var MAIN_PIN_RESET_LEFT = 50 + '%';
  var MAIN_PIN_RESET_TOP = 375 + 'px';
  // arrays for validation
  var accomodationType = [
    'bungalo',
    'flat',
    'house',
    'palace'
  ];
  var price = [
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
  var roomsNumber = [
    '1',
    '2',
    '3',
    '100'
  ];
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

  // activates form
  window.form = {
    activateForm: function () {
      fieldsetNotice.disabled = false;
      fieldsetFilter.disabled = false;
      noticeForm.classList.remove('notice__form--disabled');
      form.classList.remove('notice__form--disabled');
      for (k = 0; k < formElement.length; k++) {
        formElement[k].disabled = false;
      }
    }
  };

  // Validation ///////////////
  // 4.2.2.1 sync for checkin and checkout
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  // sync checkin and checkout
  var syncValues = function (element, value) {
    element.value = value;
  };
  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, checkin, checkout, syncValues);
  });
  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, checkin, checkout, syncValues);
  });


  // 4.2.2.2 sync for type and price
  var typeSelect = noticeForm.querySelector('#type');
  var priceSelect = noticeForm.querySelector('#price');
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  typeSelect.addEventListener('change', function () {
    window.synchronizeFields(typeSelect, priceSelect, accomodationType, price, syncValueWithMin);
  });

  // 4.2.2.3 sync for rooms and guests
  var roomsSelect = noticeForm.querySelector('#room_number');
  var guestsSelect = noticeForm.querySelector('#capacity');
  roomsSelect.addEventListener('change', function () {
    window.synchronizeFields(roomsSelect, guestsSelect, roomsNumber, capacity, syncValues);
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

  priceForm.addEventListener('invalid', checkPriceValidityHandler);
  /**
  * function resetForm resets valid form and shows popup for limited time.
  */
  var resetForm = function () {
    noticeForm.reset();
    window.map.mainPin.style.left = MAIN_PIN_RESET_LEFT;
    window.map.mainPin.style.top = MAIN_PIN_RESET_TOP;
    window.map.address.value = 'x: 572' + ', y: 447';
    var sentPopup = document.createElement('div');
    sentPopup.classList.add = 'sentPopup';
    sentPopup.style = 'z-index: 100; margin: 0 auto; padding:10px; text-align:center; outline: 3px solid orangered; left:40%; top:27%; position: fixed; background-color:white;';
    sentPopup.style.fontSize = '18px';
    sentPopup.style.width = '300px';
    sentPopup.textContent = 'Форма успешно отправлена!';
    document.body.appendChild(sentPopup);
    setTimeout(function () {
      sentPopup.style.display = 'none';
    }, 1000);
  };
  // form saves data on server
  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.save(new FormData(noticeForm), resetForm, window.backend.errorMessage);
  });
})();
