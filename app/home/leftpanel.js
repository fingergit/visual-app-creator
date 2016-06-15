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

    $scope.expandedNodes = [];
    for (var idx in $rootScope.project.children){
        var child = $rootScope.project.children[idx];
        $scope.expandedNodes.push(child);
        for (var idx2 in child.children){
            $scope.expandedNodes.push(child.children[idx2]);
        }
    }

    $scope.selectNode = function(num) {
        $scope.selectedWidget = $rootScope.project.children[num];
    };
    $scope.clearSelected = function() {
        $scope.selectedWidget = undefined;
    };

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
        if (isRedo){
            $scope.$apply();
        }
    };

    AddWidgetAction.prototype.undo = function(){
        SFinProject.removeWidget(this.widget);
        $scope.$apply();
    };

    function DelWidgetAction(name, widget){
        Action.call(this, name);
        this.widget = widget;
        this.parent = widget.parent;
        this.idx = SFinProject.getIndexInParent(widget);
        this.before = true;
    }
    DelWidgetAction.prototype=new Action();
    DelWidgetAction.prototype.constructor=DelWidgetAction;

    DelWidgetAction.prototype.do = function(isRedo){
        SFinProject.removeWidget(this.widget);
        if (isRedo){
            $scope.$apply();
        }
    };

    DelWidgetAction.prototype.undo = function(){
        SFinProject.insertWidgetByWidget(this.widget, this.parent, this.targetWidget, this.before);
        $scope.$apply();
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

        var action = new DelWidgetAction('删除控件', $scope.selectedWidget);
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