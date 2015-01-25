(function () {
	'use strict';

	var sumArray = function sumArray(values) {
		return values.reduce(function (sum, current) {
			return sum += current;
		});
	};

	module.exports = sumArray; // DON'T CHANGE THIS
})();
