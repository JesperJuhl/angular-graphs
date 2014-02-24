'use strict';

/* jasmine specs for services go here */

describe('Question App Services: ', function() {

	//Define new matcher toEqualData
	beforeEach(function(){
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});
	
	//Load app services
	beforeEach(module('questApp.services'));
	
	describe('questTable service', function() {
		var scope, ctrl, $httpBackend, resultRows;
	
		//Define Mock testRows
		var resultRows = [ {"resp_name":"Ole",
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
		
		//Mock http service
		beforeEach(inject(function($injector) {
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.when('GET', 'data/table.json').
				respond(resultRows);
		}));
		
		it('should create two table rows with data', inject(function(questTable) {
			var result = questTable.query();
			expect(result).toEqualData([]);
			$httpBackend.flush();
			expect(result).toEqualData(resultRows);
		}));

	}); //Decribe questTable

}); //Quest App