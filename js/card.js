'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var template = document.querySelector('template').content.querySelector('.map__card');
  var newAd = window.data.newAd;
  var card = document.body.appendChild(template.cloneNode(true)); // new card element from template
  var popupUl = card.querySelector('.popup__features');
  var before = document.querySelector('.map__filters-container');
  var nodeParent = before.parentNode;
  nodeParent.insertBefore(card, before); // inserts card before .map__filters-container:

  /**
  * @function generateCard creates a new card based on first element from bookingItems array.
  */

  window.generateCard = function () {
    var target = event.currentTarget;
    var id = target.getAttribute('data-id');
    card.querySelector('h3').textContent = newAd[id].offer.title;
    card.querySelector('small').textContent = newAd[id].offer.address;
    card.querySelector('.popup__price').textContent = newAd[id].offer.price + '\u20bd/ночь';
    card.querySelector('h4').textContent = newAd[id].offer.type;
    card.getElementsByTagName('p')[2].textContent = newAd[id].offer.rooms + ' комнаты для ' + newAd[id].offer.guests + ' гостей';
    card.getElementsByTagName('p')[3].textContent = 'Заезд после ' + newAd[id].offer.checkin + ', выезд до ' + newAd[id].offer.checkout;
    card.getElementsByTagName('p')[4].textContent = newAd[id].offer.description;
    card.querySelector('.popup__avatar').src = newAd[id].author.avatar;
    popupUl.innerHTML = '';
    popupUl.appendChild(createFeaturesList(newAd[id].offer.features));
  };

  /**
  * @function createFeaturesList creates a list and inserts it into the ".popup__features".
  */

  function createFeaturesList() {
    var totalFeatures = window.getRandomValue(1, 6);
    var featuresDocFragment = document.createDocumentFragment();

    for (var k = 0; k < totalFeatures; k++) {
      var featureTag = document.createElement('li');
      featureTag.className = 'feature  feature--' + newAd[k].offer.features;
      featuresDocFragment.appendChild(featureTag);
    }
    return featuresDocFragment;
  }

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
