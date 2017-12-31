'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.notice__preview  img');
  var imagesChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');
  // uploader for all images
  var uploadImages = function (file, cb) {
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          cb(reader);
        });
        reader.readAsDataURL(file);
      }
    }
  };
  // avatar upload
  var avatarUploadHandler = function () {
    var file = avatarChooser.files[0];
    uploadImages(file, function (reader) {
      avatarPreview.src = reader.result;
    });
  };
  // upload of advertisement pictures
  var uploadAdPictures = function (pictures) {
    pictures.forEach(function (picture) {
      uploadImages(picture, function (reader) {
        var image = document.createElement('img');
        image.classList.add('form__photo');
        image.style.width = '200px';
        image.src = reader.result;
        photoContainer.appendChild(image);
      });
    });
  };
  // event listeners
  avatarChooser.addEventListener('change', avatarUploadHandler);
  imagesChooser.addEventListener('change', function () {
    var pictures = [].slice.call(imagesChooser.files, function (picture) {
      return picture;
    });
    uploadAdPictures(pictures);
  });
})();
