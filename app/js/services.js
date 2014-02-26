'use strict';

/* Services */

var questAppModule = angular.module('questApp.services', ['ngResource']);

//Define service questFileRead: Reads table with all answers
questAppModule.factory('questFileRead', ['$resource', function($resource){
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

//Service to handle Age Groups
questAppModule.factory('questAgeGroups', function(){
	return {
		getGroup : function(age) {
			for (var i=0;i<this.ageGroups.length;i++) {
				if (this.ageGroups[i].from<=age && this.ageGroups[i].to>=age) {
					return this.ageGroups[i];
				}
			}
		},
		getAgeInterval : function(id){
			if (id-1<=this.ageGroups.length && id>1) {
				return { 
					from : this.ageGroups[id-1].from,
					to   : this.ageGroups[id-1].to
				}
			}
		},
		getText : function(id) {
			if (id<this.ageGroups.length && id>1) {
				return { 
					sh : this.ageGroups[id-1].shtxt,
					lg : this.ageGroups[id-1].lgtxt
				}
			}
		},
		ageGroups : [
			{ 
				id    : 1,
				from  : 11,
				to    : 20,
				shtxt : "11-20",
				lgtxt : "11 to 20 years"
			},
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
			},
			{ 
				id    : 4,
				from  : 41,
				to    : 50,
				shtxt : "41-50",
				lgtxt : "41 to 50 years"
			},
			{ 
				id    : 5,
				from  : 51,
				to    : 60,
				shtxt : "51-60",
				lgtxt : "51 to 60 years"
			},
			{ 
				id    : 6,
				from  : 61,
				to    : 70,
				shtxt : "61-70",
				lgtxt : "61 to 70 years"
			},
			{ 
				id    : 7,
				from  : 71,
				to    : 80,
				shtxt : "71-80",
				lgtxt : "71 to 80 years"
			},
			{ 
				id    : 8,
				from  : 81,
				to    : 90,
				shtxt : "81-90",
				lgtxt : "81 to 90 years"
			}
		]
	}
});