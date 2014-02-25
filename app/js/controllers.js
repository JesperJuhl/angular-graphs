'use strict';

/* Controllers */

angular.module('questApp.controllers', []).
	controller('TableCtrl', ['$scope', 'questFileRead', function($scope, questFileRead) {
		$scope.tableRows = questFileRead.queryTable();
		$scope.questionRows = questFileRead.queryQuestions();
		$scope.answerTypeRows = questFileRead.queryAnswerTypes();
		$scope.tableSearchReset = function() {
			$scope.tableSearch = {
				"resp_name":""
				,"resp_age":""
				,"resp_gender":""
				,"ques_text":""
				,"answ_text":""
				,"ques_id":""
				,"answ_id":""
			}
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
			"male" : "m",
			"female" : "f"
		}
	}])
  .controller('AnswersCtrl', [function() {
  
  }])
  .controller('GroupsCtrl', [function() {

  }]);