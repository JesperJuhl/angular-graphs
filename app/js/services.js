'use strict';

/* Services */

angular.module('questApp.services', ['ngResource']).
	//Define service questFileRead: Reads table with all answers
	factory('questFileRead', ['$resource', function($resource){
		return $resource(
			'data/:fileName.json'
			, {}
			, {
				queryTable: {
					method:'GET'
					, params:{fileName:'table'}
					, isArray:true
				},
				queryQuestions: {
					method:'GET'
					, params:{fileName:'questions'}
					, isArray:true
				},
				queryAnswerTypes: {
					method:'GET'
					, params:{fileName:'answerTypes'}
					, isArray:true
				}
			}
		);
	}]);