'use strict';

angular.module('myApp.home.rightpanel',[])

.config([function() {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('RightPanelCtrl', ['$scope', function($scope) {
}])

.controller('PropTextCtrl', ['$scope', '$window', '$log', function($scope, $window, $log) {
    $scope.propText = {
        align: 'middle'
        ,size: 10
        ,sizeUnit: 'pt'
        ,color: '#ff0'
    };

    $scope.sizeUnits=['px','pt'];

    $scope.cost = 50;

    $scope.$watchCollection('propText.align', function () {
        $log.info("sel: " + $scope.propText.align);
    });

    $scope.onTextSizeUnit = function (unit) {
        $scope.propText.sizeUnit = unit;
    };

    $scope.onColor = function (event, color) {
        $log.info(color);
    }
}])

;