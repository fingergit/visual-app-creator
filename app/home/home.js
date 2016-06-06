'use strict';

angular.module('myApp.home',[])

.config(['$stateProvider', function($stateProvider) {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('HomeCtrl', [function() {
    var splitter = new FinSplitter();
    splitter.init();
}]);