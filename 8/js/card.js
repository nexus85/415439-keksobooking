'use strict';
(function () {
  var type = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var template = document.querySelector('template').content.querySelector('.map__card');
  // var card = document.body.appendChild(template.cloneNode(true)); // new card element from template
  // var before = document.querySelector('.map__filters-container');
  // var nodeParent = before.parentNode;
  // nodeParent.insertBefore(card, before); // inserts card before .map__filters-container:
  var createCard = function (newOfferData) {
    var card = template.cloneNode(true);
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
    return card;
  };

  window.card = {
    createCard: createCard
  };
})();
