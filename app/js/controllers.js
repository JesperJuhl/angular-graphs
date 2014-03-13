'use strict';

/* Controllers */

var questAppModule = angular.module('questApp.controllers', []);

//TableCtrl
questAppModule.controller('TableCtrl', ['$scope', 'questFileRead', function($scope, questFileRead) {
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
	
//AnswersChartjsCtrl	
questAppModule.controller('AnswersChartjsCtrl', ['$scope', 'questFileRead','questAgeGroups','questColors' , function($scope, questFileRead, questAgeGroups, questColors) {
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
				if (angular.isDefined($scope.selected.ageGroup)) {
					var ageInterval = questAgeGroups.getAgeInterval($scope.selected.ageGroup);
				}
				for (var i=0;i<$scope.answers.length;i++) {
					var useValue = true;
					//check selections: ques_id
					if ($scope.answers[i].ques_id!=$scope.selected.ques_id) {useValue = false}
					//check selections: ageGroup
					if (angular.isDefined(ageInterval)) {
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
		//Get colors for one bar
		var barColors = questColors.getColors("mixed",1);
		//Generate bar chart data
		var highValue = 0;
		var lowValue = 10000000;
		if (angular.isDefined($scope.table)) {
			$scope.barChartData = {
				labels   : new Array(),
				datasets : new Array()
			}
			var barChartSeries = {
				fillColor   : "rgba("+barColors[0].red+","+barColors[0].green+","+barColors[0].blue+",0.75)",
				strokeColor : "rgba("+barColors[0].red+","+barColors[0].green+","+barColors[0].blue+",1)",
				data        : new Array()
			}
			for (var i=0;i<$scope.table.length;i++) {
				$scope.barChartData.labels.push($scope.table[i].text);
				barChartSeries.data.push($scope.table[i].count);
				highValue = Math.max(highValue,$scope.table[i].count);
				lowValue = Math.min(lowValue,$scope.table[i].count);
			}
			$scope.barChartData.datasets.push(barChartSeries);
		}
		highValue++;
		lowValue = Math.max(0,lowValue-1);
		//Chart type
		$scope.barChartType = "Bar";
		//Chart dimensions
		$scope.barChartDimensions = {Height: "300", Width: "600"}		
		//Chart options
		$scope.barChartOptions = {
			//Boolean - If we show the scale above the chart data			
			//scaleOverlay : false,

			//Boolean - If we want to override with a hard coded scale
			//scaleOverride : false,
			scaleOverride : true,
			
			//** Required if scaleOverride is true **
			//Number - The number of steps in a hard coded scale
			scaleSteps : highValue-lowValue,				
			//Number - The value jump in the hard coded scale
			scaleStepWidth : 1,
			//Number - The scale starting value
			scaleStartValue : lowValue,

			//String - Colour of the scale line	
			//scaleLineColor : "rgba(0,0,0,.1)",

			//Number - Pixel width of the scale line	
			//scaleLineWidth : 1,

			//Boolean - Whether to show labels on the scale	
			//scaleShowLabels : true,

			//Interpolated JS string - can access value
			//scaleLabel : "<%=value%>",

			//String - Scale label font declaration for the scale label
			//scaleFontFamily : "'Arial'",

			//Number - Scale label font size in pixels	
			//scaleFontSize : 12,

			//String - Scale label font weight style	
			//scaleFontStyle : "normal",

			//String - Scale label font colour	
			//scaleFontColor : "#666",	

			//Boolean - Whether grid lines are shown across the chart
			//scaleShowGridLines : true,

			//String - Colour of the grid lines
			//scaleGridLineColor : "rgba(0,0,0,.05)",
			scaleGridLineColor : "rgba(0,0,0,.15)",

			//Number - Width of the grid lines
			//scaleGridLineWidth : 1,	

			//Boolean - If there is a stroke on each bar	
			//barShowStroke : true,

			//Number - Pixel width of the bar stroke	
			//barStrokeWidth : 2,

			//Number - Spacing between each of the X value sets
			//barValueSpacing : 5,
			barValueSpacing : 20,

			//Number - Spacing between data sets within X values
			//barDatasetSpacing : 1,
			barDatasetSpacing : 0,

			//Boolean - Whether to animate the chart
			//animation : true,

			//Number - Number of animation steps
			//animationSteps : 60,

			//String - Animation easing effect
			//animationEasing : "easeOutQuart",

			//Function - Fires when the animation is complete
			//onAnimationComplete : null
		}
	});
}])
  
	//load the google chart & table library
	google.load('visualization', '1', {packages: ['corechart','table']});

//AnswersGoogleCtrl	
questAppModule.controller('AnswersGoogleCtrl', ['$scope', 'questFileRead','questAgeGroups' , function($scope, questFileRead, questAgeGroups) {
	$scope.ageGroups = questAgeGroups.ageGroups;
	$scope.questions = questFileRead.queryQuestions(); 
	$scope.answers = questFileRead.queryTable();
	$scope.answerTypes = questFileRead.queryAnswerTypes();
	$scope.selectedReset = function() {
		$scope.selected = {};
	}
	$scope.tableVisible = false;
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
				if (angular.isDefined($scope.selected.ageGroup)) {
					var ageInterval = questAgeGroups.getAgeInterval($scope.selected.ageGroup);
				}
				for (var i=0;i<$scope.answers.length;i++) {
					var useValue = true;
					//check selections: ques_id
					if ($scope.answers[i].ques_id!=$scope.selected.ques_id) {useValue = false}
					//check selections: ageGroup
					if (angular.isDefined(ageInterval)) {
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
		//Generate bar chart data
		$scope.barChartData = new Array();
		var chartValue = {};
		for (var i=0;i<$scope.table.length;i++) {
			chartValue = {
				"name" : $scope.table[i].text,
				"number" : $scope.table[i].count
			}
			$scope.barChartData.push(chartValue);
		}
	});
	$scope.$watch('table', function() {
		if (angular.isDefined($scope.table)) {
			if (angular.isDefined($scope.table[0])) {
				$scope.tableVisible = true;
			} else {
				$scope.tableVisible = false;
			}
		} else {
			$scope.tableVisible = false;
		}
	});
}])

//GroupsChartjsCtrl
questAppModule.controller('GroupsChartjsCtrl', ['$scope', 'questFileRead','questAgeGroups','questColors' , function($scope, questFileRead, questAgeGroups, questColors) {
	$scope.ageGroups = questAgeGroups.ageGroups;
	$scope.questions = questFileRead.queryQuestions(); 
	$scope.answers = questFileRead.queryTable();
	$scope.answerTypes = questFileRead.queryAnswerTypes();
	$scope.selectedReset = function() {
		$scope.selected = {};
	}
	$scope.tableVisible = false;
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
				var answer;
				var answerCount = 0;
				var answers = new Array();
				for (var i=0;i<$scope.answerTypes.length;i++) {
					if ($scope.answerTypes[i].answ_type==answerType) {
						answer = {
							 id    : $scope.answerTypes[i].answ_id
							,text  : $scope.answerTypes[i].answ_text
						}
						answers.push(answer);
						answerCount++;
					}
				}
				$scope.headerRow = answers;
				//Create a row with answers for all Age Groups (id's)
				var answerTable = {};
				for (var i=0;i<$scope.ageGroups.length;i++) {
					answerTable[$scope.ageGroups[i].id] = {
						 title : {
							 id   : $scope.ageGroups[i].id
							,shtxt: $scope.ageGroups[i].shtxt
							,lgtxt: $scope.ageGroups[i].lgtxt
						}
						,values: {}
					};
					for (var j=0;j<answerCount;j++) {
						answerTable[$scope.ageGroups[i].id].values[answers[j].id] = {
							 count: 0
							,pct  : 0
						}
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
				//Transfer counted values to table and sum up totals
				var totals = new Array();
				for (var i=0;i<$scope.ageGroups.length;i++) {
					var ageGroupId = $scope.ageGroups[i].id;
					totals[ageGroupId] = 0;
					for (var j=0;j<answerCount;j++) {
						if (angular.isDefined(count[ageGroupId])) {
							var answerId = answers[j].id;
							if (angular.isDefined(count[ageGroupId][answerId])) {
								$scope.table[ageGroupId].values[answerId].count = count[ageGroupId][answerId];
								totals[ageGroupId] = totals[ageGroupId] + count[ageGroupId][answerId];
							}
						}
					}
				}
				//Calculated percentages for each group
				var reminder;
				var lineNumber = 0;
				var maxPct = 0;
				var minPct = 100;
				for (var i=0;i<$scope.ageGroups.length;i++) {
					reminder = 100;
					var ageId = $scope.ageGroups[i].id;
					if (totals[ageId]>0) {
						lineNumber++;
						for (var j=0;j<answerCount;j++) {
							var ansId = answers[j].id;
							if (j<answerCount-1) {
								$scope.table[ageId].values[ansId].pct = Math.round(
									$scope.table[ageId].values[ansId].count 
									/ totals[ageId]
									* 100
								);
								maxPct = Math.max(maxPct, $scope.table[ageId].values[ansId].pct);
								minPct = Math.min(minPct, $scope.table[ageId].values[ansId].pct);
								reminder = reminder - $scope.table[ageId].values[ansId].pct;
							} else {
								$scope.table[ageId].values[ansId].pct = reminder;
							}
						}
					}
				}
				maxPct = maxPct + 10;
				minPct = Math.max(0, minPct - 10);
				//Get colors for the relevant number of lines
				var chartColors = questColors.getColors("mixed",lineNumber);
				//Generate Line Chart data
				if (angular.isDefined($scope.table)) {
					$scope.lineChartData = {
						labels   : new Array(),
						datasets : new Array()
					}
					for (var i=0;i<$scope.headerRow.length;i++) {
						$scope.lineChartData.labels.push($scope.headerRow[i].text);
					}
					var cix = 0;
					for (var i=0;i<$scope.ageGroups.length;i++) {
						var lineChartSeries = {
							// "rgba("+barColors[0].red+","+barColors[0].green+","+barColors[0].blue+",0.75)",
							fillColor        : "",
							strokeColor      : "",
							pointcolor       : "",
							pointStrokeColor : "",
							data             : new Array()
						}
						var ageId = $scope.ageGroups[i].id;
						if (totals[ageId]>0) {
							lineChartSeries.fillColor = "rgba("+chartColors[cix].red+","+chartColors[cix].green+","+chartColors[cix].blue+",0.75)";
							lineChartSeries.strokeColor = "rgba("+chartColors[cix].red+","+chartColors[cix].green+","+chartColors[cix].blue+",1)";
							lineChartSeries.fillColor = "rgba("+chartColors[cix].red+","+chartColors[cix].green+","+chartColors[cix].blue+",0.75)";
							lineChartSeries.strokeColor = "rgba("+chartColors[cix].red+","+chartColors[cix].green+","+chartColors[cix].blue+",1)";
							cix++;
							for (var j=0;j<answerCount;j++) {
								var ansId = answers[j].id;
								lineChartSeries.data.push($scope.table[ageId].values[ansId].pct);
							}
						}
						$scope.lineChartData.datasets.push(lineChartSeries);
					}
				}
				//Chart type
				$scope.lineChartType = "Line";
				//Chart dimensions
				$scope.lineChartDimensions = {Height: "300", Width: "600"}		
				//Chart options
				$scope.lineChartOptions = {

					//Boolean - If we show the scale above the chart data			
					//scaleOverlay : false,
					
					//Boolean - If we want to override with a hard coded scale
					//scaleOverride : false,
					scaleOverride : true,
					
					//** Required if scaleOverride is true **
					//Number - The number of steps in a hard coded scale
					//scaleSteps : null,
					scaleSteps : Math.round((maxPct-minPct)/10),
					//Number - The value jump in the hard coded scale
					//scaleStepWidth : null,
					scaleStepWidth : 10,
					//Number - The scale starting value
					//scaleStartValue : null,
					scaleStartValue : Math.round(minPct/10),

					//String - Colour of the scale line	
					//scaleLineColor : "rgba(0,0,0,.1)",
					
					//Number - Pixel width of the scale line	
					//scaleLineWidth : 1,

					//Boolean - Whether to show labels on the scale	
					//scaleShowLabels : true,
					
					//Interpolated JS string - can access value
					//scaleLabel : "<%=value%>",
					
					//String - Scale label font declaration for the scale label
					//scaleFontFamily : "'Arial'",
					
					//Number - Scale label font size in pixels	
					//scaleFontSize : 12,
					
					//String - Scale label font weight style	
					//scaleFontStyle : "normal",
					
					//String - Scale label font colour	
					//scaleFontColor : "#666",	
					
					///Boolean - Whether grid lines are shown across the chart
					//scaleShowGridLines : true,
					
					//String - Colour of the grid lines
					//scaleGridLineColor : "rgba(0,0,0,.05)",
					
					//Number - Width of the grid lines
					//scaleGridLineWidth : 1,	
					
					//Boolean - Whether the line is curved between points
					//bezierCurve : true,
					bezierCurve : false,
					
					//Boolean - Whether to show a dot for each point
					//pointDot : true,
					
					//Number - Radius of each point dot in pixels
					//pointDotRadius : 3,
					
					//Number - Pixel width of point dot stroke
					//pointDotStrokeWidth : 1,
					
					//Boolean - Whether to show a stroke for datasets
					//datasetStroke : true,
					
					//Number - Pixel width of dataset stroke
					//datasetStrokeWidth : 2,
					datasetStrokeWidth : 4,
					
					//Boolean - Whether to fill the dataset with a colour
					//datasetFill : true,
					datasetFill : false,
					
					//Boolean - Whether to animate the chart
					//animation : true,

					//Number - Number of animation steps
					//animationSteps : 60,
					
					//String - Animation easing effect
					//animationEasing : "easeOutQuart",

					//Function - Fires when the animation is complete
					//onAnimationComplete : null

				}				
			} else {
				$scope.table = {}
			}
		} else {
			$scope.table = {}
		}
	});
	$scope.$watch('table', function() {
		if (angular.isDefined($scope.table)) {
			if (angular.isDefined($scope.table[$scope.ageGroups[0].id])) {
				$scope.tableVisible = true;
			} else {
				$scope.tableVisible = false;
			}
		} else {
			$scope.tableVisible = false;
		}
	});
}]) //GroupsChartjsCtrl