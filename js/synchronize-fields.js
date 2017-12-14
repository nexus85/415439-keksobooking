'use strict';

(function () {

  window.synchronizeFields = function (mainField, dependentField, mainValues, dependentValues, syncFunction) {
    var mainIndex = mainValues.indexOf(event.currentTarget.value); // index of current field
    var dependentElement = dependentValues[mainIndex]; // index of dependentValue equals to main index.
    syncFunction(dependentField, dependentElement); // callback
  };

})();
