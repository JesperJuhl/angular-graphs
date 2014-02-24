'use strict';

/* Controllers */

angular.module('questApp.controllers', []).
	controller('TableCtrl', ['$scope', 'questTable', function($scope, questTable) {
	$scope.tableRows = questTable.query();
  }])
  .controller('AnswersCtrl', [function() {

  }])
  .controller('GroupsCtrl', [function() {

  }]);