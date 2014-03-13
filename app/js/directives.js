'use strict';

/* Directives */

var questAppModule = angular.module('questApp.directives', []);

questAppModule.directive('ovaGoogleChart', function () {
	return {
		restrict: 'E',
		link: function ($scope, $elm, $attr) {
			$scope.$watch($attr.data, function (value) {
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'name');
				data.addColumn('number', 'number');

				angular.forEach(value, function (row) {
					data.addRow([row.name, row.number]);
				});

				var options = {
					title: $attr.title,
					height: $attr.height,
					width: $attr.width,
					legend: 'bottom'
				};

				//render the desired chart based on the type attribute provided
				var chart;
				switch ($attr.type) {
					case('PieChart'):
						chart = new google.visualization.PieChart($elm[0]);
						break;
					case('ColumnChart'):
						chart = new google.visualization.ColumnChart($elm[0]);
						break;
					case('BarChart'):
						chart = new google.visualization.BarChart($elm[0]);
						break;
					case('Table'):
						chart = new google.visualization.Table($elm[0]);
						break;
				}
				chart.draw(data, options);
			});
		}
	}
});

questAppModule.directive('ovaChartjsChart', function () {
	//Link function
	function link(scope, element, attrs) {
		function drawChart() {
			//Get canvas
			var canvas = element.find('canvas');
			//Get context
			if (angular.isUndefined(scope.ovaContext)) {
				scope.ovaContext = canvas[0].getContext('2d');
			}
			//Adjust dimensions
			scope.ovaContext.canvas.width = scope.ovaCanvasDimensions.Width;
			scope.ovaContext.canvas.height = scope.ovaCanvasDimensions.Height;
			//Draw chart
			switch (scope.ovaChartjsType) {
				case 'Line':
					scope.ovaChart = new Chart(scope.ovaContext).Line(scope.ovaChartjsData,scope.ovaChartjsOptions);
					break;
				case 'Bar':
					scope.ovaChart = new Chart(scope.ovaContext).Bar(scope.ovaChartjsData,scope.ovaChartjsOptions);
					break;
				case 'Radar':
					scope.ovaChart = new Chart(scope.ovaContext).Radar(scope.ovaChartjsData,scope.ovaChartjsOptions);
					break;
				case 'PolarArea':
					scope.ovaChart = new Chart(scope.ovaContext).PolarArea(scope.ovaChartjsData,scope.ovaChartjsOptions);
					break;
				case 'Pie':
					scope.ovaChart = new Chart(scope.ovaContext).Pie(scope.ovaChartjsData,scope.ovaChartjsOptions);
					break;
				case 'Doughnut':
					scope.ovaChart = new Chart(scope.ovaContext).Doughnut(scope.ovaChartjsData,scope.ovaChartjsOptions);
					break;
			}
		}
		function eraseChart() {
			//Get canvas
			var canvas = element.find('canvas');
			//Get context
			if (angular.isDefined(scope.ovaContext)) {
				scope.ovaContext.clearRect(0, 0, canvas[0].width, canvas[0].height);
			}
		}
		scope.$watch('ovaChartjsData', function() {
			if (angular.isDefined(scope.ovaChartjsData)){
				if (scope.ovaChartjsData.labels.length>0) {
					drawChart();
				} else {
					eraseChart();
				}
			}
		});
	}
	//Return options for Compile
	return {
		scope: {
			ovaChartjsOptions: '=options',
			ovaChartjsData: '=data',
			ovaChartjsType: '=type',
			ovaCanvasDimensions: '=dimensions'
		},
		restrict: 'E',
		link: link,
		template: '<canvas width="{{ovaCanvasDimensions.Width}}" height="{{ovaCanvasDimensions.Height}}"></canvas>'
	}
});
