'use strict';
(function () {
  window.util = {
    /**
    * function generateNoRepeatNumber function makes the random elements unique.
    * @param {array} array we work with
    * @return {object} object
    */
    generateNoRepeatValue: function (array) {
      return array.splice(Math.floor(Math.random() * array.length), 1);
    }
  };
  window.util = {
  /**
  * function getRandomValue returns random value.
  * @param {number} minValue
  * @param {number} maxValue
  * @return {number} random number
  */
    getRandomValue: function (minValue, maxValue) {
      return Math.random() * (maxValue - minValue) + minValue;
    }
  };
})();
