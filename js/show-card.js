'use strict';
(function () {
  var ESC_KEYCODE = 27;
  function closeAdHandler() {
    var popup = document.querySelector('.popup');
    popup.parentNode.removeChild(popup);
  }
  window.showCard = {
    openPopup: function (newOfferData) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.createCard(newOfferData)); // new card element from template
      var before = document.querySelector('.map__filters-container');
      var nodeParent = before.parentNode;
      nodeParent.insertBefore(fragment, before); // inserts card before .map__filters-container:
      var closePopup = document.querySelector('.popup__close');
      closePopup.addEventListener('click', closeAdHandler);
    }

  };
  var closePopupOnEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var popup = document.querySelector('.popup');
      popup.parentNode.removeChild(popup);
    }
  };

  // parent container
  var container = document.querySelector('.map__pins');
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
  this function goes up to onclick!
  @param {target} pin selected pin
  */
  function switchClasses(pin) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
      closeAdHandler();
    }
    selectedPin = pin;
    selectedPin.classList.add('map__pin--active');
  }
  document.addEventListener('keydown', closePopupOnEscHandler);
})();
