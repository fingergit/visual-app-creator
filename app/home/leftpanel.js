'use strict';

angular.module('myApp.home.leftpanel',[])

.config([function() {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('LeftPanelCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = false;
    $scope.groups = [
        {
            title: '视图结构'
            ,content: '视图结构树状态表'
        },
        {
            title: '模板'
            ,content: '模板列表'
        }
    ];
}])

.controller('WidgetIconCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.widgets = [
        {name: 'heading', iconNormalPos: 0, iconHoverPos: -50}
        ,{name: 'tailing', iconNormalPos: -100, iconHoverPos: -150}
        ,{name: 'haha', iconNormalPos: -200, iconHoverPos: -250}
    ];
}])

;