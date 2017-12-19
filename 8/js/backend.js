'use strict';

(function () {
  var URL_LOAD = 'https://1510.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://1510.dump.academy/keksobooking';
  var ACCEPTED = 200;
  var TIMEOUT = 10000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ACCEPTED) {
        onLoad(xhr.response);
      //  console.log ('rabotaet!');
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    },
  };
})();
