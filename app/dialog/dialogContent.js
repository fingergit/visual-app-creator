'use strict';

angular.module('myApp.dialog',[])

.config([function() {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('DialogCtrl', ['$scope', '$uibModalInstance', '$log',
    function($scope, $uibModalInstance, $log) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.selected = {
            item: $scope.items[0]
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
;