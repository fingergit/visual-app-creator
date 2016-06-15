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

.controller('PropTextCtrl', ['$scope', '$rootScope','$window', '$log', 'ActionManager', function($scope, $rootScope, $window, $log, ActionManager) {

    // $scope.propText = {
    //     align: {desc: $rootScope.propTextDesc.align, value: 'center'}
    //     ,size: {comb: true, desc: $rootScope.propTextDesc.size, value: {desc: $rootScope.propTextDesc.size.value, value: 10}
    //             ,unit: {desc: $rootScope.propTextDesc.size.unit, value: 'pt'}}
    //     ,color: {desc: $rootScope.propTextDesc.color, value: '#FFFFFF00'}
    //     ,backColor: {desc: $rootScope.propTextDesc.backColor, value: '#FF00FF00'}
    //     ,position: {desc: $rootScope.propTextDesc.position, value: 'relative'}
    //     ,left: {desc: $rootScope.propTextDesc.left, value: '0'}
    //     ,visible: {desc: $rootScope.propTextDesc.visible, value: 'true'}
    // };
    $scope.propText = $rootScope.selElem.propText;

    $scope.ary = ['a', 'b', 'c'];

    $scope.slider = {
        value: 150
        ,options: {
            floor: 0
            ,ceil: 450
            ,hideLimitLabels:true
        }
    };

    // $scope.$watchCollection('propText.align', function () {
    //     $log.info("sel: " + $scope.propText.align);
    // });

    $scope.onTextSizeUnit = function (unit) {
        $scope.propText.size.unit.value = unit;
    };

    $scope.onBtnTest = function () {
    };

    // $scope.$watch('propText.color',function(newValue,oldValue, scope){
    //     valueChange(newValue, oldValue, scope, "文字颜色", scope.propText, "color");
    // });
    //
    // $scope.$watch('propText.size',function(newValue,oldValue, scope){
    //     valueChange(newValue, oldValue, scope, "字体", scope.propText, "size");
    // });
    //
    // $scope.$watch('slider.value',function(newValue, oldValue, scope){
    //     valueChange(newValue, oldValue, scope, "数值", scope.slider, "value");
    // });

    /**
     * 当单个数据发生变化时，将期加入undoredo中。
     * @param newValue obj.field的新值
     * @param oldValue obj.field的旧值
     * @param scope obj所在的scope
     * @param name  action名称。
     * @param obj   action操作的对象。
     * @param field 操作的对象的字段。
     */
    function valueChange(newValue, oldValue, scope, name, propName, obj, field) {
        if (oldValue == null || oldValue === newValue){
            return;
        }

        if ($rootScope.selElem == null){
            $log.info("no element selected.");
            return;
        }

        var $elem = $("#" + $rootScope.selElem.id);
        if (null == $elem){
            $log.info("selected element not exist.");
            return;
        }

        switch (propName){
            case 'align':
                $elem.css("text-align", obj[field]);
                break;
            case 'color':
                $elem.css("color", obj[field]);
                break;
            case 'backColor':
                $elem.css("background-color", obj[field]);
                break;
            case 'position':
                $elem.css("position", obj[field]);
                break;
            case 'left':
                $elem.css("left", obj[field] + "px");
                break;
            case 'visible':
                $elem.css("visibility", obj[field]?"inherit":"hidden");
                break;
            case 'width':
                $elem.css("width", $scope.propText.width.value.value + $scope.propText.width.unit.value);
                break;
            case 'size':
                $elem.css("font-size", $scope.propText.size.value.value + $scope.propText.size.unit.value);
                break;
        }

        if (obj.undo){
            obj.undo = false;
            return;
        }
        if (obj.redo){
            obj.redo = false;
            return;
        }
        var action = new ValueAction(name, obj, field, oldValue, newValue, $scope);
        ActionManager.addAction(action);
    }

    function watchAll(obj, objVarName){
        for (var item in obj){
            if (typeof(obj[item]) !== "object"){
                continue;
            }
            if ('comb' in obj[item]){
                watchAll(obj[item], objVarName + '.' + item);
            }
            if ('desc' in obj[item]){
                var actionName = obj[item]['desc']['actionName'];
                var changeObj = obj[item];

                // 使用匿名函数向回调函数传参。
                (function (actionName, propName, changeObj) {
                    $scope.$watch(objVarName + '.' + item + '.value', function(newValue,oldValue, scope){
                        valueChange(newValue, oldValue, scope, actionName, propName, changeObj, "value");
                    });
                    $log.debug("now watch: " + objVarName + '.' + item + '.value');
                })(actionName, item, changeObj);
            }
        }
    }
    watchAll($scope.propText, 'propText');

    // $scope.$watch('propText.align.value', function(newValue,oldValue, scope){
    //     valueChange(newValue, oldValue, scope, scope.propText.align['desc']['actionName'], scope.propText.align, "value");
    // });
    // $scope.$watch('propText.color.value', function(newValue,oldValue, scope){
    //     valueChange(newValue, oldValue, scope, scope.propText.color['desc']['actionName'], scope.propText.color, "value");
    // });
}])

;