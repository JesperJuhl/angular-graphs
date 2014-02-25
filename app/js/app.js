'use strict';

angular.module('questApp', [
  'ngRoute',
  'questApp.services',
  'questApp.controllers',
  'questApp.filters'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table', {templateUrl: 'partials/table.html', controller: 'TableCtrl'});
  $routeProvider.when('/answers', {templateUrl: 'partials/answers.html', controller: 'AnswersCtrl'});
  $routeProvider.when('/groups', {templateUrl: 'partials/groups.html', controller: 'GroupsCtrl'});
  $routeProvider.otherwise({redirectTo: '/table'});
}]);
