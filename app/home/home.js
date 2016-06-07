'use strict';

angular.module('myApp.home',['myApp.home.toolbar','myApp.home.leftpanel','myApp.home.rightpanel'])

.config(['$stateProvider', function($stateProvider) {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('HomeCtrl', ['$scope', '$window', function($scope,$window) {
    var splitter = new FinSplitter();
    splitter.init();

    $scope.customer = {
        name: 'Naomi'
        ,address: '1600 Amphitheatre'
    };
    
    $scope.onDropComplete = function (obj, event) {
        var target = $(event.event.target);
        var tx = target.position().left;
        var ty = target.position().top;
        var newElem = $("<div>" + obj.name + "</div>");
        newElem.appendTo(event.event.target);
        newElem.css("position", "absolute");
        var elemX = event.x - tx;
        var elemY = event.y - ty;
        newElem.css("left", elemX + "px");
        newElem.css("top", elemY + "px");
        newElem.css("color", "red");
    }
}])

.directive('finToolbar', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/toolbar.html'
    };
})

.directive('finLeftPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/leftpanel.html'
    };
})

.directive('finWidgetPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/widgetpanel.html'
    };
})

.directive('finWidgetIcon', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/widgeticon.html'
    };
})

.directive('finRightPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/rightpanel.html'
    };
})

.directive('finPropTextPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/prop-text.html'
    };
})
;