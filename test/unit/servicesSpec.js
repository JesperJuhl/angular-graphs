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
	
	describe('questFileRead service: ', function() {
		var scope, ctrl, $httpBackend;
	
		//Define Mock testRows
		var resultTableRows = [ 
			{
				"resp_name":"Ole",
				"resp_age":"25",
				"resp_gender":"M",
				"ques_text":"Hvorfor?",
				"answ_text":"Fordi"
			}, 
			{
				"resp_name":"Bente",
				"resp_age":"25",
				"resp_gender":"F",
				"ques_text":"Hvorfor?",
				"answ_text":"Fordi"
			}
		];
		var resultAnswerTypeRows = [
			{
				"answ_type" : "1",
				"answ_id" : "1",
				"answ_text" : "Yes"
			},
			{
				"answ_type" : "1",
				"answ_id" : "2",
				"answ_text" : "No"
			}
		];
		var resultQuestionRows = [
			{
				"ques_id" : "1",
				"ques_text" : "Feeling good?",
				"answ_type" : "1"
			},
			{
				"ques_id" : "2",
				"ques_text" : "Do you dance?",
				"answ_type" : "1"
			}
		];
		
		describe('queryTable GET: ', function() {
			//Mock http service
			beforeEach(inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.when('GET', 'data/table.json').
					respond(resultTableRows);
			}));
			
			it('should create two table rows with data', inject(function(questFileRead) {
				var result = questFileRead.queryTable();
				expect(result).toEqualData([]);
				$httpBackend.flush();
				expect(result).toEqualData(resultTableRows);
			}));
		}); //Describe queryTable GET

		describe('queryQuestions GET: ', function() {
			//Mock http service
			beforeEach(inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.when('GET', 'data/questions.json').
					respond(resultQuestionRows);
			}));
			
			it('should create two table rows with data', inject(function(questFileRead) {
				var result = questFileRead.queryQuestions();
				expect(result).toEqualData([]);
				$httpBackend.flush();
				expect(result).toEqualData(resultQuestionRows);
			}));
		}); //Describe queryQuestions GET

		describe('queryAnswerTypes GET: ', function() {
			//Mock http service
			beforeEach(inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.when('GET', 'data/answerTypes.json').
					respond(resultAnswerTypeRows);
			}));
			
			it('should create two table rows with data', inject(function(questFileRead) {
				var result = questFileRead.queryAnswerTypes();
				expect(result).toEqualData([]);
				$httpBackend.flush();
				expect(result).toEqualData(resultAnswerTypeRows);
			}));
		}); //Describe queryAnswerTypes GET
		
	}); //Decribe questFileRead

}); //Quest App