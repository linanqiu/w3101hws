(function () {
  'use strict';

  // very unelegant.
  module.exports = function (complexFunction) {
    var values = {};
    var voidCount = 0;
    var voidResult = null;

    return function () {
      var args = Array.prototype.slice.call(arguments);
      var key = JSON.stringify(args);

      // especially this part
      if (args.length === 0) {
        if (voidCount === 0) {
          voidCount++;
          return (voidResult = complexFunction.apply(this, args));
        }

        return voidResult;
      }

      if (values[key]) {
        return values[key];
      } else {
        return (values[key] = complexFunction.apply(this, args));
      }
    };
  };

})();
