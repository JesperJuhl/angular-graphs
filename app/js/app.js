'use strict';

angular.module('questApp', [
  'ngRoute',
  'questApp.services',
  'questApp.directives',
  'questApp.controllers',
  'questApp.filters'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table', {templateUrl: 'partials/table.html', controller: 'TableCtrl'});
  $routeProvider.when('/answersChartjs', {templateUrl: 'partials/answersChartjs.html', controller: 'AnswersChartjsCtrl'});
  $routeProvider.when('/answersGoogle', {templateUrl: 'partials/answersGoogle.html', controller: 'AnswersGoogleCtrl'});
  $routeProvider.when('/groups', {templateUrl: 'partials/groups.html', controller: 'GroupsCtrl'});
  $routeProvider.otherwise({redirectTo: '/table'});
}]);
