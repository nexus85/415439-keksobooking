'use strict';
(function () {
  var ESC_KEYCODE = 27;
  /**
  * function closeAdHandler removes popup
  */
  function closeAdHandler() {
    var popup = document.querySelector('.popup');
    popup.parentNode.removeChild(popup);
  }
  /**
  * function closePopupOnEscHandler closes popup when esc pressed
  * @param {event} evt esc pressed
  */
  var closePopupOnEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var popup = document.querySelector('.popup');
      popup.parentNode.removeChild(popup);
      document.removeEventListener('keydown', closePopupOnEscHandler);
    }
  };
  window.showCard = {
    /**
    * function openPopup render popup on click
    * @param {array} newOfferData data we got from server
    */
    openPopup: function (newOfferData) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.createCard(newOfferData)); // new card element from template
      var before = document.querySelector('.map__filters-container');
      var nodeParent = before.parentNode;
      nodeParent.insertBefore(fragment, before); // inserts card before .map__filters-container:
      var closePopup = document.querySelector('.popup__close');
      closePopup.addEventListener('click', closeAdHandler);
      document.addEventListener('keydown', closePopupOnEscHandler);
    }
  };
})();
