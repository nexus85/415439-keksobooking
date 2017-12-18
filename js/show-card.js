'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.showCard = {
    openPopup: function (newOfferData) {
      var fragment = document.createDocumentFragment();
      //  var template = document.querySelector('template').content.querySelector('.map__card');
      for (var i = 0; i < 6; i++) {
        fragment.appendChild(window.card.createCard(newOfferData[i])); // new card element from template
        var before = document.querySelector('.map__filters-container');
        var nodeParent = before.parentNode;
        nodeParent.insertBefore(fragment, before); // inserts card before .map__filters-container:
      }
    }

  };
  window.backend.load(window.showCard.openPopup);
  // ///////////////  work with popup ////////////////////////////////
  // popup hidden by default
  var popup = document.querySelector('.popup');
  popup.classList.add('hidden');

  /**
  * @function  closeAdHandler function closes popup.
  */

  function closeAdHandler() {
    popup.classList.add('hidden');
  }

  var closePopup = document.querySelector('.popup__close');

  // event listener for popup__close
  closePopup.addEventListener('click', closeAdHandler);

  /**
  * @function  closePopupOnEscHandler popup closes when esc pressed
  */

  var closePopupOnEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popup.classList.add('hidden');
    }
  };
  document.addEventListener('keydown', closePopupOnEscHandler);
})();
