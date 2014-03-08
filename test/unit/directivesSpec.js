'use strict';

/* jasmine specs for directives go here */

describe('Question App Directives: ', function() {

	beforeEach(module('questApp.directives'));

	describe('ovaGoogleChart: ', function() {
	
		var elm,        // ovaGoogleChart element
			scope;      // the scope where our directive is inserted
	
		//Create new child scope, data object and DOM element
		beforeEach(inject(function($rootScope, $compile) {
			scope = $rootScope.$new();
			scope.testData = [
				 { "name" : "Yes", "number" : 1 }
				,{ "name" : "No", "number" : 2 }
			];
			elm = angular.element(
				'<ova-google-chart data="testData" type="ColumnChart" title="Test" width="600">'
				+'</ova-google-chart>'
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
	
	describe('ovaChartjsChart: ', function() {
	
		var elm,        // googleChart element
			scope;      // the scope where our directive is inserted
	
		//Create new child scope, data object and DOM element
		beforeEach(inject(function($rootScope, $compile) {
			scope = $rootScope.$new();
			scope.testType = "Bar";
			scope.testDimensions = {Height: "300", Width: "600"};
			scope.testOptions = {};
			scope.testData = {
				labels: ["Yes","No"],
				datasets: [{
					fillColor   : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data: [ 1, 2 ]
				}]
			};
			elm = angular.element(
				"<ova-chartjs-chart data='testData' options='testOptions' type='testType' dimensions='testDimensions'>"
				+"</ova-google-chart>"
			);
			$compile(elm)(scope);
			scope.$digest();
		}));
		
		//Chartjs chart is loaded if canvas tag has been created
		it('should include an canvas tag for the graph', function() {
			var canvasTag = elm.find('canvas');
			expect(canvasTag.length).not.toEqual(0);
		});
	
	}); // ovaChartjsChart
	
}); //Quest App Directives