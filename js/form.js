'use strict';

//  Validation
// var formSubmit = noticeForm.querySelector('.form__submit');
(function () {
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

  // Validation ////////////////
  // 4.2.2.1 sync for checkin and checkout
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  /**
  * @function  synchroniseTimeIn sync for checkin
  */

  function synchroniseTimeInHandler() {
    timeIn.value = timeOut.value;
    return timeOut.value;
  }

  /**
  * @function  synchroniseTimeIn sync for checkout
  */

  function synchroniseTimeOutHandler() {
    timeOut.value = timeIn.value;
    return timeIn.value;
  }

  timeIn.addEventListener('change', synchroniseTimeOutHandler);
  timeOut.addEventListener('change', synchroniseTimeInHandler);

  // 4.2.2.2 sync for type and price
  var typeSelect = noticeForm.querySelector('#type');
  var priceSelect = noticeForm.querySelector('#price');
  /**
  * @function  synchroniseTypeAndPriceHandler sync for type and price
  */

  function synchroniseTypeAndPriceHandler() {
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
  typeSelect.addEventListener('change', synchroniseTypeAndPriceHandler);

  // 4.2.2.3 sync for rooms and guests
  var roomsSelect = noticeForm.querySelector('#room_number');
  var guestsSelect = noticeForm.querySelector('#capacity');
  /**
  * @function  synchroniseRoomsAndGuestsHandler sync for rooms and guests
  */

  function synchroniseRoomsAndGuestsHandler() {
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
  roomsSelect.addEventListener('change', synchroniseRoomsAndGuestsHandler);


  var titleForm = noticeForm.querySelector('#title');
  var priceForm = noticeForm.querySelector('#price');

  /**
* @function  generateBorder function generates border
*/

  var generateBorder = function (element) {
    element.style.outlineWidth = '2px';
    element.style.outlineColor = 'red';
  };

  /**
* @function  generateBorder function resets border
*/

  var resetBorder = function (element) {
    element.style.outlineWidth = '';
    element.style.outlineColor = '';
  };

  /**
* @function  checkTitleValidityHandler function checks title validity
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
* @function  checkTitleValidityHandler function checks price validity
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
})();
