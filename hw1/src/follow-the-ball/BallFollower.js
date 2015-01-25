(function () {
	'use strict';

	var BallFollower = function BallFollower(start, swaps) {
		this.start = start;
		this.swaps = swaps;
		this.swap = function () {
			for (var i = 0; i < swaps.length; i++) {
				var swap = swaps[i];
				if (this.start === swap[0]) {
					this.start = swap[1];
				} else if (this.start === swap[1]) {
					this.start = swap[0];
				}
			}
			return this.start;
		};
	};

	module.exports = BallFollower; // DON'T ALTER THIS
})();
