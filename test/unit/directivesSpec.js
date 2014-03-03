'use strict';

/* jasmine specs for directives go here */

describe('Question App Directives: ', function() {

	beforeEach(module('questApp.directives'));

	describe('googleChart: ', function() {
	
		var elm,        // googleChart element
			scope;      // the scope where our directive is inserted
	
		//Create new child scope, data object and DOM element
		beforeEach(inject(function($rootScope, $compile) {
			scope = $rootScope.$new();
			scope.testData = [
				 { "name" : "Yes", "number" : 1 }
				,{ "name" : "No", "number" : 2 }
			];
			elm = angular.element(
				'<google-chart data="testData" type="ColumnChart" title="Test" width="600">'
				+'</google-chart>'
			);
			$compile(elm)(scope);
			scope.$digest();
		}));
		
		//Google chart is loaded if svg tag has been created
		it('should include an svg tag for the graph', function() {
			var svgTag = elm.find('svg');
			expect(svgTag.length).not.toEqual(0);
		});
	
	}); // googleChart
	
}); //Quest App Directives