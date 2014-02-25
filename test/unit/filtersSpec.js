'use strict';

/* jasmine specs for filters go here */

describe('Question App Filters: ', function() {
	
	//Load App Filters
	beforeEach(module('questApp.filters'));
	
	describe('Filter genderIcon: ', function() {
		it('should convert f/m to gender symbols', inject(function(genderIconFilter) {
			expect(genderIconFilter('f')).toBe('\u2640');
			expect(genderIconFilter('m')).toBe('\u2642');
			expect(genderIconFilter('e')).toBe('?');
		}));
	});
	
}); //questApp Filters
