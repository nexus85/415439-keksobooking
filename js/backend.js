'use strict';

(function () {
  var URL_LOAD = 'https://1510.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var STATUS_BAD_REQUEST = 400;
  var STATUS_PAGE_NOT_FOUND = 404;
  var INTERNAL_SERVER_ERROR = 500;
  var TIMEOUT = 10000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_OK:
          onLoad(xhr.response);
          break;
        case STATUS_BAD_REQUEST:
          error = 'Неверный запрос. Вы что-то делаете не так. Мы не виноваты!';
          break;
        case STATUS_PAGE_NOT_FOUND:
          error = 'Страница не существует. Возможно, ее удалил Роспотребнадзор.';
          break;
        case INTERNAL_SERVER_ERROR:
          error = 'У нас работают криворукие программисты. Обратитесь к конкурентам. Они классные!';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.status.text;
      }
      if (error) {
        onError(error);
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
    errorMessage: function (message) {
      var newError = document.createElement('div');
      newError.style = 'z-index: 100; margin: 0 auto; padding:10px; text-align:center; outline: 3px solid orangered; left:36%; top:27%; position: fixed; background-color:white;';
      newError.style.fontSize = '18px';
      newError.style.width = '300px';
      newError.textContent = message;
      document.body.appendChild(newError);
      setTimeout(function () {
        newError.style.display = 'none';
      }, 2000);
    }
  };
})();
