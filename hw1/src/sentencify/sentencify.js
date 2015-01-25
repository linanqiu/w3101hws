(function () {
	'use strict';

	var sentencify = function (words, joiner) {
		if (joiner) {
			return words.join(joiner);
		} else {
			return words.join(' ');
		}
	};

	module.exports = sentencify; // DO NOT CHANGE THIS
})();
