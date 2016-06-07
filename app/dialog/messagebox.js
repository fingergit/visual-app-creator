'use strict';

angular.module('myApp.messagebox',[])

.config([function() {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('MessageBoxCtrl', ['$scope', '$uibModalInstance', '$log',
    function($scope, $uibModalInstance, $log) {
        $scope.dlgTitle = '提示';
        $scope.dlgContent = '';
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }])
;