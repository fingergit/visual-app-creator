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

.controller('ProjectCtrl', ['$scope', '$rootScope', 'ActionManager', 'FinProjectRender'
    , function($scope, $rootScope, ActionManager, FinProjectRender) {
    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    };

    $scope.$watch('selectedElem', function (newValue,oldValue, scope) {
        if (newValue === oldValue){
            return;
        }

        $rootScope.selectedElem = newValue;
    });

    // $scope.selectedElem = $rootScope.selectedElem;
    // 哪些节点处于展开状态。
    $rootScope.expandedNodes = [];
    var projChildren = $rootScope.project.children;
    for (var idx in projChildren){
        if (!projChildren.hasOwnProperty(idx)){
            continue;
        }
        var child = $rootScope.project.children[idx];
        if (child.children.length > 0){
            $rootScope.expandedNodes.push(child);
            for (var idx2 in child.children){
                if (!child.children.hasOwnProperty(idx2)){
                    continue;
                }
                $rootScope.expandedNodes.push(child.children[idx2]);
            }
        }
    }
}])

.controller('WidgetIconCtrl', ['$scope', '$window', function($scope, $window) {
    // $scope.widgets = [
    //     {name: 'heading', iconNormalPos: 0, iconHoverPos: -50}
    //     ,{name: 'tailing', iconNormalPos: -100, iconHoverPos: -150}
    //     ,{name: 'haha', iconNormalPos: -200, iconHoverPos: -250}
    // ];
    
    $scope.widgets = EFinProjWidgetDesc;
}])

;