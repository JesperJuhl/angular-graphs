'use strict';

/* jasmine specs for controllers go here */

describe('Question App Controllers: ', function() {

	//Load app controllers
	beforeEach(module('questApp.controllers'));
	
	describe('TableCtrl controller: ', function() {
		var scope, tableCtrlTest, questFileReadMock;

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
		
		//Define Mock service questFileRead and inject into TableCtrl
		beforeEach(function() {
			questFileReadMock = {
				queryTable: function() {
					return resultTableRows;
				},
				queryQuestions: function() {
					return resultQuestionRows;
				},
				queryAnswerTypes: function() {
					return resultAnswerTypeRows;
				}
			};
			
		});
		
		//Get controller
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			tableCtrlTest = $controller('TableCtrl', {$scope:scope, questFileRead: questFileReadMock} );
		}));
		
		it('should use service questFileRead method queryTable', inject(function() {
			expect(scope.tableRows).toEqual(resultTableRows);
		}));

		it('should use service questFileRead method queryQuestions', inject(function() {
			expect(scope.questionRows).toEqual(resultQuestionRows);
		}));
		
		it('should use service questFileRead method answerTypeRows', inject(function() {
			expect(scope.answerTypeRows).toEqual(resultAnswerTypeRows);
		}));

		it('should reset tableSearch', inject(function() {
			var emptySearch = {
				"resp_name":""
				,"resp_age":""
				,"resp_gender":""
				,"ques_text":""
				,"answ_text":""
				,"ques_id":""
				,"answ_id":""
			};
			scope.tableSearch = {
				"resp_name":"Ole"
				,"resp_age":"25"
				,"resp_gender":"m"
				,"ques_text":"Why?"
				,"answ_text":"Because"
				,"ques_id":"1"
				,"answ_id":"1"
			};
			expect(scope.tableSearch).not.toEqual(emptySearch);
			scope.tableSearchReset();
			expect(scope.tableSearch).toEqual(emptySearch);
		}));
		
		it('should watch tableSearch.ques_id and update answFilter.answ_type', inject(function() {
			var emptySearch = {
				"resp_name":""
				,"resp_age":""
				,"resp_gender":""
				,"ques_text":""
				,"answ_text":""
				,"ques_id":""
				,"answ_id":""
			};
			scope.tableSearch = {
				"resp_name":"Ole"
				,"resp_age":"25"
				,"resp_gender":"m"
				,"ques_text":"Why?"
				,"answ_text":"Because"
				,"ques_id":"1"
				,"answ_id":"1"
			};
			expect(scope.answFilter).not.toBeDefined();
			scope.tableSearch.ques_id = "1";
			scope.$apply();
			expect(scope.answFilter.answ_type).toEqual("1");
		}));
		
		it('should define gender constants', inject(function() {
			expect(scope.gender.male).toEqual("m");
			expect(scope.gender.female).toEqual("f");
		}));
	}); //Decribe TableCtrl
	
}); //Quest App Controllers
