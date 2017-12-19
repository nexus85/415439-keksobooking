'use strict';
(function () {
  var type = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var template = document.querySelector('template').content.querySelector('.map__card');
  var createCard = function (newOfferData) {
    var card = template.cloneNode(true);
    var popupUl = card.querySelector('.popup__features');
    //  var target = event.currentTarget;
    //  var id = target.getAttribute('data-id');
    //  console.log(target);
    //  console.log(newOfferData);
    card.querySelector('h3').textContent = newOfferData.offer.title;
    card.querySelector('small').textContent = newOfferData.offer.address;
    card.querySelector('.popup__price').textContent = newOfferData.offer.price + '\u20bd/ночь';
    card.querySelector('h4').textContent = type[newOfferData.offer.type];
    card.getElementsByTagName('p')[2].textContent = newOfferData.offer.rooms + ' комнаты для ' + newOfferData.offer.guests + ' гостей';
    card.getElementsByTagName('p')[3].textContent = 'Заезд после ' + newOfferData.offer.checkin + ', выезд до ' + newOfferData.offer.checkout;
    card.getElementsByTagName('p')[4].textContent = newOfferData.offer.description;
    card.querySelector('.popup__avatar').src = newOfferData.author.avatar;
    popupUl.innerHTML = '';
    popupUl.appendChild(createFeaturesList(newOfferData.offer.features));
    return card;
  };

  /**
  * @function createFeaturesList creates a list and inserts it into the ".popup__features".
  */

  function createFeaturesList(newFeaturesData) {
    var featuresDocFragment = document.createDocumentFragment();

    for (var k = 0; k < newFeaturesData.length; k++) {
      var featureTag = document.createElement('li');
      featureTag.className = 'feature  feature--' + newFeaturesData[k];
      featuresDocFragment.appendChild(featureTag);
    }
    return featuresDocFragment;
  }
  window.card = {
    createCard: createCard
  };
})();
