'use strict';

/* jasmine specs for controllers go here */

describe('Question App Controllers', function() {

	//Load app controllers
	beforeEach(module('questApp.controllers'));
	
	describe('TableCtrl controller', function() {
		var scope, tableCtrlTest, questTableMock;
	
		//Define Mock questTable get and inject into TableCtrl
		beforeEach(function() {
			questTableMock = {
				query: function() {
					var testRows = [ {"resp_name":"Ole",
									"resp_age":"25",
									"resp_gender":"M",
									"ques_text":"Hvorfor?",
									"answ_text":"Fordi"}, 
									{"resp_name":"Bente",
									"resp_age":"25",
									"resp_gender":"F",
									"ques_text":"Hvorfor?",
									"answ_text":"Fordi"}
									];
					return testRows;
				}
			};
			
		});
		
		//Get controller
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			tableCtrlTest = $controller('TableCtrl', {$scope:scope, questTable: questTableMock} );
		}));
		
		it('should use service questTable to retrieve data', inject(function() {
			//
			expect(scope.tableRows[0]).toEqual(
				{"resp_name":"Ole",
				"resp_age":"25",
				"resp_gender":"M",
				"ques_text":"Hvorfor?",
				"answ_text":"Fordi"}
			);
		}));

	}); //Decribe questTable

}); //Quest App
