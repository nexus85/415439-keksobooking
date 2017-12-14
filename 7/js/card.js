'use strict';
(function () {
  var template = document.querySelector('template').content.querySelector('.map__card');
  var card = document.body.appendChild(template.cloneNode(true)); // new card element from template

  window.card = {
    card: card
  };
})();
