'use strict';
(function () {
  var template = document.querySelector('template').content.querySelector('.map__card');
  var card = document.body.appendChild(template.cloneNode(true)); // new card element from template
  var before = document.querySelector('.map__filters-container');
  var nodeParent = before.parentNode;
  nodeParent.insertBefore(card, before); // inserts card before .map__filters-container:

  window.card = {
    card: card
  };
})();
