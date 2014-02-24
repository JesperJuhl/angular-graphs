'use strict';

/* Services */

angular.module('questApp.services', ['ngResource']).
	//Define service questTable: Reads table with all answers
	factory('questTable', ['$resource', function($resource){
		return $resource('data/table.json');
	}]);