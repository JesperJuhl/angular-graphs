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

	describe('questAgeGroups service: ', function() {
		
		describe('Functions: ', function() {

			it('getGroup should derive Age Groups from age', inject(function(questAgeGroups) {
				var result = questAgeGroups.getGroup(20);
				expect(result.to).toEqual(20);
				result = questAgeGroups.getGroup(33);
				expect(result.from).toEqual(31);
				//Age 0 or 1000 should not return any values
				result = questAgeGroups.getGroup(0);
				expect(result).toBeUndefined();
				result = questAgeGroups.getGroup(1000);
				expect(result).toBeUndefined();
			}));		
		
			it('getAgeInterval should derive from/to from id', inject(function(questAgeGroups) {
				var result = questAgeGroups.getAgeInterval(3);
				expect(result.to).toEqual(40);
				result = questAgeGroups.getAgeInterval(7);
				expect(result).toEqual({from:71,to:80});
				//Id 0 or 10 should not return any values
				result = questAgeGroups.getAgeInterval(0);
				expect(result).toBeUndefined();
				result = questAgeGroups.getAgeInterval(10);
				expect(result).toBeUndefined();
			}));		

			it('getText should derive sh/lg from id', inject(function(questAgeGroups) {
				var result = questAgeGroups.getText(3);
				expect(result.sh).toEqual("31-40");
				result = questAgeGroups.getText(5);
				expect(result).toEqual({sh:"51-60",lg:"51 to 60 years"});
				//Id 0 or 10 should not return any values
				result = questAgeGroups.getText(0);
				expect(result).toBeUndefined();
				result = questAgeGroups.getText(10);
				expect(result).toBeUndefined();
			}));		

		}); //Describe Functions
		
	}); //Decribe questAgeGroups
	
}); //Quest App