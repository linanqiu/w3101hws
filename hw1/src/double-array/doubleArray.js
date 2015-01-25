(function () {
	'use strict';

	var doubleArray = function (arrayToDouble) {
		return arrayToDouble.map(function (value) {
			return value * 2;
		});
	};

	module.exports = doubleArray;

})();
