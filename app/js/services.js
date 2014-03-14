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
}]); //questFileRead

//Service to provide colors for charts
questAppModule.factory('questColors', function(){
	return {
		maxColors: 10,
		getColors: function(type,number) {
			//Value to return
			var colors = new Array();
			//number must be between 1 and maxColors
			if (number>=1&&number<=this.maxColors) {
				var colorsAll = this.colorGroups[type];
				if (angular.isDefined(colorsAll)) {
					if (type=="mixed") {
						//Use from 1 to number
						for (var i=0;i<number;i++) {
							colors.push(colorsAll[i]);
						}
					} else {
						//Use 1, 1+step, 1+2*step, ...
						var step = Math.round((this.maxColors-1)/(number-1));
						for (var i=0;i<=this.maxColors;i++) {
							if (i+1<=number) {
								colors.push(colorsAll[i*step]);
							}
						}
					}
				}
			}
			if (colors.length>0) {
				return colors;
			} else {
				return false;
			}
		},
		colorGroups: {
			mixed: [
				{
					"red": "41"
					,"green": "64"
					,"blue": "124"
					,"text": "White"
				}
			   ,{
					"red": "102"
					,"green": "0"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "32"
					,"green": "32"
					,"blue": "32"
					,"text": "White"
				}
			   ,{
					"red": "208"
					,"green": "133"
					,"blue": "4"
					,"text": "White"
				}
			   ,{
					"red": "0"
					,"green": "102"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "160"
					,"green": "160"
					,"blue": "255"
					,"text": "Black"
				}
			   ,{
					"red": "124"
					,"green": "64"
					,"blue": "41"
					,"text": "White"
				}
			   ,{
					"red": "128"
					,"green": "128"
					,"blue": "128"
					,"text": "White"
				}
			   ,{
					"red": "255"
					,"green": "255"
					,"blue": "0"
					,"text": "Black"
				}
			   ,{
					"red": "0"
					,"green": "255"
					,"blue": "0"
					,"text": "Black"
				}
			],
			blue: [
				{
					"red": "200"
					,"green": "200"
					,"blue": "255"
					,"text": "Black"
				}
			   ,{
					"red": "160"
					,"green": "160"
					,"blue": "255"
					,"text": "Black"
				}
			   ,{
					"red": "120"
					,"green": "120"
					,"blue": "255"
					,"text": "Black"
				}
			   ,{
					"red": "80"
					,"green": "80"
					,"blue": "255"
					,"text": "White"
				}
			   ,{
					"red": "40"
					,"green": "40"
					,"blue": "255"
					,"text": "White"
				}
			   ,{
					"red": "0"
					,"green": "0"
					,"blue": "255"
					,"text": "White"
				}
			   ,{
					"red": "0"
					,"green": "0"
					,"blue": "204"
					,"text": "White"
				}
			   ,{
					"red": "0"
					,"green": "0"
					,"blue": "153"
					,"text": "White"
				}
			   ,{
					"red": "0"
					,"green": "0"
					,"blue": "102"
					,"text": "White"
				}
			   ,{
					"red": "0"
					,"green": "0"
					,"blue": "51"
					,"text": "White"
				}
			],
			brown: [
				{
					"red": "255"
					,"green": "229"
					,"blue": "204"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "204"
					,"blue": "153"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "178"
					,"blue": "102"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "153"
					,"blue": "51"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "128"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "215"
					,"green": "108"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "175"
					,"green": "88"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "135"
					,"green": "68"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "95"
					,"green": "48"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "55"
					,"green": "28"
					,"blue": "0"
					,"text": "White"
				}
			],
			red: [
				{
					"red": "255"
					,"green": "200"
					,"blue": "200"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "160"
					,"blue": "160"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "120"
					,"blue": "120"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "80"
					,"blue": "80"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "40"
					,"blue": "40"
					,"text": "Black"
				}
			   ,{
					"red": "255"
					,"green": "0"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "204"
					,"green": "0"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "153"
					,"green": "0"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "102"
					,"green": "0"
					,"blue": "0"
					,"text": "White"
				}
			   ,{
					"red": "51"
					,"green": "0"
					,"blue": "0"
					,"text": "White"
				}
			]
		}
	}
}); //questColors

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
			if (id<this.ageGroups.length && id>=1) {
				return { 
					from : this.ageGroups[id-1].from,
					to   : this.ageGroups[id-1].to
				}
			}
		},
		getText : function(id) {
			if (id<this.ageGroups.length && id>=1) {
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