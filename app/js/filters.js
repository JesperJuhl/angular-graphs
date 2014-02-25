'use strict';

/* Filters */

angular.module('questApp.filters', []).filter('genderIcon', function() {
	return function(input) {
		var gsymb;
		switch (input) {
			case 'f': gsymb = '\u2640'; break;
			case 'm': gsymb = '\u2642'; break;
			default: gsymb = '?'
		}
		return gsymb;
	};
});