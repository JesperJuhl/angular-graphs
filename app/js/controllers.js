'use strict';

/* Controllers */

angular.module('questApp.controllers', []).
	controller('TableCtrl', ['$scope', 'questFileRead', function($scope, questFileRead) {
		$scope.tableRows = questFileRead.queryTable();
		$scope.questionRows = questFileRead.queryQuestions();
		$scope.answerTypeRows = questFileRead.queryAnswerTypes();
		$scope.tableSearchReset = function() {
			$scope.tableSearch = {};
		}
		$scope.$watch('tableSearch.ques_id', function(newVal, oldVal) {
			//set answ_type based on ques_id
			if (angular.isDefined(newVal)) {
				for (var i=0; i < $scope.questionRows.length; i++) {
					if ($scope.questionRows[i].ques_id == newVal) {
						$scope.answFilter = {
							"answ_type" : $scope.questionRows[i].answ_type
						};
						break;
					}
				}
			} else {
				$scope.answ_type = "";
			}
		});
		//Define constants for gender selection
		$scope.gender = {
			male   : "m",
			female : "f"
		}
	}])
  .controller('AnswersCtrl', ['$scope', 'questFileRead','questAgeGroups' , function($scope, questFileRead, questAgeGroups) {
		$scope.ageGroups = questAgeGroups.ageGroups;
		$scope.questions = questFileRead.queryQuestions(); 
		$scope.answers = questFileRead.queryTable();
		$scope.answerTypes = questFileRead.queryAnswerTypes();
		$scope.selectedReset = function() {
			$scope.selected = {};
		}
		$scope.$watch('selected.ques_id+selected.gender+selected.ageGroup', function() {
			//Derive table with number of answers based on selections
			if (angular.isDefined($scope.selected)) {
				if (angular.isDefined($scope.selected.ques_id)) {
					//Get answerType
					var answerType;
					for (var i=0;i<$scope.questions.length;i++) {
						if ($scope.questions[i].ques_id==$scope.selected.ques_id) {
							answerType = $scope.questions[i].answ_type;
							break;
						}
					}
					//Get possible answers and set count to 0
					var answers = new Array();
					var answer;
					for (var i=0;i<$scope.answerTypes.length;i++) {
						if ($scope.answerTypes[i].answ_type==answerType) {
							answer = {
								 id    : $scope.answerTypes[i].answ_id
								,text  : $scope.answerTypes[i].answ_text
								,count : 0
							}
							answers.push(answer);
						}
					}
					$scope.table = answers;
					//Count using selections
					var count = {};
					for (var i=0;i<$scope.answers.length;i++) {
						var useValue = true;
						//check selections: ques_id
						if ($scope.answers[i].ques_id!=$scope.selected.ques_id) {useValue = false}
						//check selections: ageGroup
						if (angular.isDefined($scope.selected.ageGroup)) {
							var ageInterval = questAgeGroups.getAgeInterval($scope.selected.ageGroup);
							if ($scope.answers[i].resp_age<ageInterval.from || $scope.answers[i].resp_age>ageInterval.to) {useValue = false}
						}
						//check selections: gender
						if (angular.isDefined($scope.selected.gender)) {
							if ($scope.answers[i].resp_gender!=$scope.selected.gender) {useValue = false}
						}
						if (useValue) {
							if (angular.isDefined(count[$scope.answers[i].answ_id])) {
								count[$scope.answers[i].answ_id]++;
							} else {
								count[$scope.answers[i].answ_id] = 1;
							}
						}
					}
					//Transfer counted values to table
					for (var i=0;i<$scope.table.length;i++) {
						if (angular.isDefined(count[$scope.table[i].id])) {
							$scope.table[i].count = count[$scope.table[i].id];
						}
					}
				} else {
					$scope.table = {}
				}
			} else {
				$scope.table = {}
			}
		});
  }])
  .controller('GroupsCtrl', ['$scope', 'questFileRead','questAgeGroups' , function($scope, questFileRead, questAgeGroups) {
		$scope.ageGroups = questAgeGroups.ageGroups;
		$scope.questions = questFileRead.queryQuestions(); 
		$scope.answers = questFileRead.queryTable();
		$scope.answerTypes = questFileRead.queryAnswerTypes();
		$scope.selectedReset = function() {
			$scope.selected = {};
		}
		$scope.$watch('selected.ques_id', function() {
			//Derive table with number of answers based on selections
			if (angular.isDefined($scope.selected)) {
				if (angular.isDefined($scope.selected.ques_id)) {
					//Get answerType
					var answerType;
					for (var i=0;i<$scope.questions.length;i++) {
						if ($scope.questions[i].ques_id==$scope.selected.ques_id) {
							answerType = $scope.questions[i].answ_type;
							break;
						}
					}
					//Get possible answers and set count to 0
					var answers = new Array();
					var answer;
					var answerCount = 0;
					for (var i=0;i<$scope.answerTypes.length;i++) {
						if ($scope.answerTypes[i].answ_type==answerType) {
							answer = {
								 id    : $scope.answerTypes[i].answ_id
								,text  : $scope.answerTypes[i].answ_text
								,count : 0
								,pct   : 0
							}
							answers.push(answer);
							answerCount++;
						}
					}
					$scope.headerTable = answers;
					//Create a row with answers for all Age Groups (id's)
					var answerTable = {};
					for (var i=0;i<$scope.ageGroups.length;i++) {
						answerTable[$scope.ageGroups[i].id] = new Array();
						for (var j=0;j<answerCount;j++)
						answerTable[$scope.ageGroups[i].id][j] = {
							id   : answers[j].id,
							text : answers[j].text,
							count: answers[j].count,
							pct  : answers[j].pct
						}
					}
					//Append to scope
					$scope.table = answerTable;
					//Count using selections
					var count = new Array();
					for (var i=0;i<$scope.answers.length;i++) {
						//check selections: ques_id
						if ($scope.answers[i].ques_id==$scope.selected.ques_id) {
							//Derive ageGroup
							var ageGroup = questAgeGroups.getGroup($scope.answers[i].resp_age);
							if (angular.isUndefined(count[ageGroup.id])) {
								count[ageGroup.id] = new Array();
							}
							if (angular.isDefined(count[ageGroup.id][$scope.answers[i].answ_id])) {
								count[ageGroup.id][$scope.answers[i].answ_id]++;
							} else {
								count[ageGroup.id][$scope.answers[i].answ_id] = 1;
							}
						}
					}
					//Transfer counted values to table
					for (var i=0;i<$scope.ageGroups.length;i++) {
						for (var j=0;j<answerCount;j++) {
							var ageGroupId =$scope.ageGroups[i].id;
							if (angular.isDefined(count[ageGroupId])) {
								if (angular.isDefined(count[ageGroupId][j])) {
									$scope.table[ageGroupId][j].count = count[ageGroupId][j];
								}
							}
						}
					}
					//Calculated percentages for each group					
				} else {
					$scope.table = {}
				}
			} else {
				$scope.table = {}
			}
		});
  }])