'use strict';
(function () {
  /**
  * @function generateNoRepeatNumber function makes the random elements unique.
    @param {array} array we work with
  */

  window.generateNoRepeatValue = function (array) {
    return array.splice(Math.floor(Math.random() * array.length), 1);
  };
  // function returns a random value.
  window.getRandomValue = function (minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  };
})();
