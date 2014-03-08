'use strict';

/* jasmine specs for controllers go here */

describe('Question App Controllers: ', function() {

	//Define Mock test data
	var resultTableRows = [ 
		{
			resp_id     : "1",
			ques_id     : "1",
			answ_id     : "1",
			resp_name   : "Ole",
			resp_age    : "25",
			resp_gender : "m",
			ques_text   : "Feeling good?",
			answ_text   : "Yes"
		}, 
		{
			resp_id     : "2",
			ques_id     : "1",
			answ_id     : "2",
			resp_name   : "Bente",
			resp_age    : "25",
			resp_gender : "f",
			ques_text   : "Feeling good?",
			answ_text   : "No"
		},
		{
			resp_id     : "3",
			ques_id     : "2",
			answ_id     : "1",
			resp_name   : "Ib",
			resp_age    : "35",
			resp_gender : "m",
			ques_text   : "Feeling good?",
			answ_text   : "Yes"
		}, 
		{
			resp_id     : "4",
			ques_id     : "2",
			answ_id     : "2",
			resp_name   : "Dora",
			resp_age    : "34",
			resp_gender : "f",
			ques_text   : "Feeling good?",
			answ_text   : "No"
		}
	];
	var resultAnswerTypeRows = [
		{
			answ_type : "1",
			answ_id   : "1",
			answ_text : "Yes"
		},
		{
			answ_type : "1",
			answ_id   : "2",
			answ_text : "No"
		}
	];
	var resultQuestionRows = [
		{
			ques_id   : "1",
			ques_text : "Feeling good?",
			answ_type : "1"
		},
		{
			ques_id   : "2",
			ques_text : "Do you dance?",
			answ_type : "1"
		}
	];

	//Define Mock services 

	//questFileRead 
	var questFileReadMock = {
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
	//questAgeGroups
	var questAgeGroupsMock = {
		getGroup: function() {
			return this.ageGroups[1];
		},
		getAgeInterval: function() {
			return { 
				from : this.ageGroups[0].from,
				to   : this.ageGroups[0].to
			}
		},
		getText: function() {
			return { 
				sh : this.ageGroups[0].shtxt,
				lg : this.ageGroups[0].lgtxt
			}
		},
		ageGroups: [
			{ 
				id    : 2,
				from  : 21,
				to    : 30,
				shtxt : "21-30",
				lgtxt : "21 to 30 years"
			},
			{ 
				id    : 3,
				from  : 31,
				to    : 40,
				shtxt : "31-40",
				lgtxt : "31 to 40 years"
			}
		]
	};
		

	//Load app controllers
	beforeEach(module('questApp.controllers'));
	
	describe('TableCtrl controller: ', function() {
		var scope, tableCtrlTest;

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
			var emptySearch = {};
			scope.tableSearch = {
				 resp_name   : "Ole"
				,resp_age    : "25"
				,resp_gender : "m"
			};
			expect(scope.tableSearch).not.toEqual(emptySearch);
			scope.tableSearchReset();
			expect(scope.tableSearch).toEqual(emptySearch);
		}));
		
		it('should watch tableSearch.ques_id and update answFilter.answ_type', inject(function() {
			scope.tableSearch = {
				ques_id: "1"
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
	
	describe('AnswersChartjsCtrl controller: ', function() {
		var scope, answersCtrlTest;

		beforeEach(inject(function($rootScope, $controller) {
			//Get controller
			scope = $rootScope.$new();
			answersCtrlTest = $controller('AnswersChartjsCtrl', {$scope:scope, questFileRead: questFileReadMock, questAgeGroups: questAgeGroupsMock} );
		}));
		
		it('should use service questAgeGroups property ageGroups', inject(function() {
			expect(scope.ageGroups).toEqual(questAgeGroupsMock.ageGroups);
		}));

		it('should use service questFileRead method queryTable', inject(function() {
			expect(scope.answers).toEqual(resultTableRows);
		}));

		it('should use service questFileRead method queryQuestions', inject(function() {
			expect(scope.questions).toEqual(resultQuestionRows);
		}));
		
		it('should use service questFileRead method answerTypeRows', inject(function() {
			expect(scope.answerTypes).toEqual(resultAnswerTypeRows);
		}));

		it('should reset selected', inject(function() {
			var emptySelected = {};
			scope.selected = {
				ques_id: ""
			};
			expect(scope.selected).not.toEqual(emptySelected);
			scope.selectedReset();
			expect(scope.selected).toEqual(emptySelected);
		}));

		it('should watch selected.ques_id and update table correctly', inject(function() {
			scope.selected = {
				ques_id: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.ques_id = "1";
			scope.$apply();
			expect(scope.table[0].count).toEqual(1);
		}));

		it('should watch selected.ageGroup and update table correctly', inject(function() {
			scope.selected = {
				ques_id: "1",
				ageGroup: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.ageGroup = "2";
			scope.$apply();
			expect(scope.table[0].count).toEqual(1);
		}));
		
		it('should watch selected.gender and update table correctly', inject(function() {
			scope.selected = {
				ques_id: "1",
				gender: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.gender = "m";
			scope.$apply();
			expect(scope.table[0].count).toEqual(1);
		}));

	}); //Decribe AnswersChartjsCtrl

	describe('AnswersGoogleCtrl controller: ', function() {
		var scope, answersCtrlTest;

		beforeEach(inject(function($rootScope, $controller) {
			//Get controller
			scope = $rootScope.$new();
			answersCtrlTest = $controller('AnswersGoogleCtrl', {$scope:scope, questFileRead: questFileReadMock, questAgeGroups: questAgeGroupsMock} );
		}));
		
		it('should use service questAgeGroups property ageGroups', inject(function() {
			expect(scope.ageGroups).toEqual(questAgeGroupsMock.ageGroups);
		}));

		it('should use service questFileRead method queryTable', inject(function() {
			expect(scope.answers).toEqual(resultTableRows);
		}));

		it('should use service questFileRead method queryQuestions', inject(function() {
			expect(scope.questions).toEqual(resultQuestionRows);
		}));
		
		it('should use service questFileRead method answerTypeRows', inject(function() {
			expect(scope.answerTypes).toEqual(resultAnswerTypeRows);
		}));

		it('should reset selected', inject(function() {
			var emptySelected = {};
			scope.selected = {
				ques_id: ""
			};
			expect(scope.selected).not.toEqual(emptySelected);
			scope.selectedReset();
			expect(scope.selected).toEqual(emptySelected);
		}));

		it('should watch selected.ques_id and update table correctly', inject(function() {
			scope.selected = {
				ques_id: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.ques_id = "1";
			scope.$apply();
			expect(scope.table[0].count).toEqual(1);
		}));

		it('should watch selected.ageGroup and update table correctly', inject(function() {
			scope.selected = {
				ques_id: "1",
				ageGroup: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.ageGroup = "2";
			scope.$apply();
			expect(scope.table[0].count).toEqual(1);
		}));
		
		it('should watch selected.gender and update table correctly', inject(function() {
			scope.selected = {
				ques_id: "1",
				gender: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.gender = "m";
			scope.$apply();
			expect(scope.table[0].count).toEqual(1);
		}));

		it('should watch table and update tableVisible accordingly', inject(function() {
			//Table are changed by changing ques_id
			scope.selected = {
				ques_id: ""
			};
			expect(scope.tableVisible).toEqual(false);
			scope.selected.ques_id = "1";
			scope.$apply();
			expect(scope.tableVisible).toEqual(true);
		}));

	}); //Decribe AnswersGoogleCtrl

	describe('GroupsCtrl controller: ', function() {
		var scope, groupsCtrlTest;

		//Get controller
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			groupsCtrlTest = $controller('GroupsCtrl', {$scope:scope, questFileRead: questFileReadMock, questAgeGroups: questAgeGroupsMock} );
		}));
		
		it('should use service questAgeGroups property ageGroups', inject(function() {
			expect(scope.ageGroups).toEqual(questAgeGroupsMock.ageGroups);
		}));

		it('should use service questFileRead method queryTable', inject(function() {
			expect(scope.answers).toEqual(resultTableRows);
		}));

		it('should use service questFileRead method queryQuestions', inject(function() {
			expect(scope.questions).toEqual(resultQuestionRows);
		}));
		
		it('should use service questFileRead method answerTypeRows', inject(function() {
			expect(scope.answerTypes).toEqual(resultAnswerTypeRows);
		}));

		it('should reset selected', inject(function() {
			var emptySelected = {};
			scope.selected = {
				ques_id: ""
			};
			expect(scope.selected).not.toEqual(emptySelected);
			scope.selectedReset();
			expect(scope.selected).toEqual(emptySelected);
		}));

 		it('should watch selected.ques_id and update table correctly', inject(function() {
			scope.selected = {
				ques_id: ""
			};
			expect(scope.table).not.toBeDefined();
			scope.selected.ques_id = "2";
			scope.$apply();
			expect(scope.table[3].values[1].count).toEqual(1);
		}));
		
		it('should watch table and update tableVisible accordingly', inject(function() {
			//Table are changed by changing ques_id
			scope.selected = {
				ques_id: ""
			};
			expect(scope.tableVisible).toEqual(false);
			scope.selected.ques_id = "2";
			scope.$apply();
			expect(scope.tableVisible).toEqual(true);
		}));
	
	}); //Describe GroupsCtrl

}); //Quest App Controllers
