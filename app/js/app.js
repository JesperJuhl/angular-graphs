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
  $routeProvider.when('/groupsChartjs', {templateUrl: 'partials/groupsChartjs.html', controller: 'GroupsChartjsCtrl'});
  $routeProvider.when('/groupsGoogle', {templateUrl: 'partials/groupsGoogle.html', controller: 'GroupsGoogleCtrl'});
  $routeProvider.otherwise({redirectTo: '/table'});
}]);
