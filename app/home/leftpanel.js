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

.controller('ProjectCtrl', ['$scope', '$rootScope', 'ActionManager', function($scope, $rootScope, ActionManager) {
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

    // 哪些节点处于展开状态。
    $scope.expandedNodes = [];
    var projChildren = $rootScope.project.children;
    for (var idx in projChildren){
        if (!projChildren.hasOwnProperty(idx)){
            continue;
        }
        var child = $rootScope.project.children[idx];
        if (child.children.length > 0){
            $scope.expandedNodes.push(child);
            for (var idx2 in child.children){
                if (!child.children.hasOwnProperty(idx2)){
                    continue;
                }
                $scope.expandedNodes.push(child.children[idx2]);
            }
        }
    }

    $scope.$watch('selectedWidget', function (newValue,oldValue, scope) {
        if (newValue === oldValue){
            return;
        }
        $scope.selectedWidgetParent = SFinProject.findParent($scope.selectedWidget, $rootScope.project);
    });

    function AddWidgetAction(name, widget, parent, targetWidget, before){
        Action.call(this, name);
        this.widget = widget;
        this.parent = parent;
        this.targetWidget = targetWidget;
        this.before = before;
    }
    AddWidgetAction.prototype=new Action();
    AddWidgetAction.prototype.constructor=AddWidgetAction;

    AddWidgetAction.prototype.do = function(isRedo){
        SFinProject.insertWidgetByWidget(this.widget, this.parent, this.targetWidget, this.before);
        $scope.selectedWidget = this.widget;
        if (isRedo){
            $rootScope.safeApply();
        }

        if (!$.inArray(this.parent, $scope.expandedNodes)){
            $scope.expandedNodes.push(this.parent);
        }
    };

    AddWidgetAction.prototype.undo = function(){
        SFinProject.removeWidget(this.widget, this.parent);
        $scope.selectedWidget = null;
        $rootScope.safeApply();
    };

    function DelWidgetAction(name, widget, parent){
        Action.call(this, name);
        this.widget = widget;
        this.parent = parent;
        this.idx = SFinProject.getIndexInParent(widget, parent);
        this.before = true;
    }
    DelWidgetAction.prototype=new Action();
    DelWidgetAction.prototype.constructor=DelWidgetAction;

    DelWidgetAction.prototype.do = function(isRedo){
        SFinProject.removeWidget(this.widget, this.parent);
        $scope.selectedWidget = null;
        if (isRedo){
            $rootScope.safeApply();
        }
    };

    DelWidgetAction.prototype.undo = function(){
        SFinProject.insertWidgetByWidget(this.widget, this.parent, this.targetWidget, this.before);
        $scope.selectedWidget = this.widget;
        $rootScope.safeApply();
    };

    $scope.idx = 1;
    $scope.addWidget = function (event) {
        if (!$scope.selectedWidget || $scope.selectedWidget.type !== EFinWidgetType.page){
            return;
        }
        var newBtn = SFinProject.newWidget('added' + $scope.idx, $rootScope.project, EFinWidgetType.button, null);
        var action = new AddWidgetAction('添加控件', newBtn, $scope.selectedWidget);
        ActionManager.addAction(action);
        $scope.idx ++;
    };

    $scope.delWidget = function (event) {
        if (!$scope.selectedWidget){
            return;
        }

        var action = new DelWidgetAction('删除控件', $scope.selectedWidget, $scope.selectedWidgetParent);
        ActionManager.addAction(action);
    };

}])

.controller('WidgetIconCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.widgets = [
        {name: 'heading', iconNormalPos: 0, iconHoverPos: -50}
        ,{name: 'tailing', iconNormalPos: -100, iconHoverPos: -150}
        ,{name: 'haha', iconNormalPos: -200, iconHoverPos: -250}
    ];
}])

;