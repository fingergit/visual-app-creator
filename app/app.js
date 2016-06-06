'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router'
    ,'myApp.dialog'
    ,'myApp.home'
    ,'ngAnimate'
    ,'ui.bootstrap'
    ,'ngDraggable'
]).
config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  // $locationProvider.hashPrefix('!');

  // $routeProvider.otherwise({redirectTo: '/view1'});

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: 'home/home.html'
          ,controller: 'HomeCtrl'
      })
      .state('state1', {
        url: "/state1",
        templateUrl: "state1/state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "state1/state1.list.html",
        controller: function($scope) {
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "state2/state2.html"
      })
      .state('state2.list', {
        url: "/list",
        templateUrl: "state2/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      });
}]);
