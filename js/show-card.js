'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.showCard = {
    openPopup: function (newOfferData) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.createCard(newOfferData)); // new card element from template
      var before = document.querySelector('.map__filters-container');
      var nodeParent = before.parentNode;
      nodeParent.insertBefore(fragment, before); // inserts card before .map__filters-container:
      var closePopup = document.querySelector('.popup__close');
      closePopup.addEventListener('click', closeAdHandler);
      function closeAdHandler() {
        var popup = document.querySelector('.popup');
        popup.parentNode.removeChild(popup);
      }
    }

  };
  var closePopupOnEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var popup = document.querySelector('.popup');
      popup.parentNode.removeChild(popup);
    }
  };
  document.addEventListener('keydown', closePopupOnEscHandler);
})();
