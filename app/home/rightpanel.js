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

.controller('PropTextCtrl', ['$scope', '$window', '$log', 'ActionManager', function($scope, $window, $log, ActionManager) {

    $scope.propTextDesc = {
        align: {name: '对齐', actionName: '对齐', type: 'enumButton', typeRange: [
            {value: 'left', icon: 'fa-align-left'}
            ,{value: 'center', icon: 'fa-align-center'}
            ,{value: 'right', icon: 'fa-align-right'}
            ,{value: 'justify', icon: 'fa-align-justify'}
        ]}
        , size: {value: {name: '尺寸', actionName: '尺寸', type: 'int', min: 0, max: 999},
            unit: {name: '尺寸单位', actionName: '尺寸单位', type: 'enum', typeRange: ['px','pt']}}
        ,color: {name: '颜色', actionName: '文字颜色', type: 'color'}
    };

    $scope.propText = {
        align: {desc: $scope.propTextDesc.align, value: 'center'}
        ,size: {value: {desc: $scope.propTextDesc.size.value, value: 10}
                ,unit: {desc: $scope.propTextDesc.size.unit, value: 'pt'}}
        ,color: {desc: $scope.propTextDesc.color, value: '#FFFFFF00'}
    };

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

    function ValueAction(name, obj, field, oldValue, newValue){
        Action.call(this, name, obj, field, oldValue, newValue);
    }
    ValueAction.prototype=new Action();
    ValueAction.prototype.constructor=ValueAction;

    ValueAction.prototype.do = function(isRedo){
        this.obj[this.field] = this.newValue;
        this.obj.undo = false;
        this.obj.redo = false;
        if (isRedo){
            this.obj.redo = true;
            $scope.$apply();
        }
    };

    ValueAction.prototype.undo = function(){
        this.obj[this.field] = this.oldValue;
        this.obj.undo = true;
        this.obj.redo = false;
        $scope.$apply();
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
    function valueChange(newValue, oldValue, scope, name, obj, field) {
        if (oldValue == null || oldValue === newValue){
            return;
        }
        if (obj.undo){
            obj.undo = false;
            return;
        }
        if (obj.redo){
            obj.redo = false;
            return;
        }
        var action = new ValueAction(name, obj, field, oldValue, newValue);
        ActionManager.addAction(action);
    }

    function watchAll(obj, objVarName){
        for (var item in obj){
            if ('desc' in obj[item]){
                var actionName = obj[item]['desc']['actionName'];
                var changeObj = obj[item];

                // 使用匿名函数向回调函数传参。
                (function (actionName, changeObj) {
                    $scope.$watch(objVarName + '.' + item + '.value', function(newValue,oldValue, scope){
                        valueChange(newValue, oldValue, scope, actionName, changeObj, "value");
                    });
                    $log.debug("now watch: " + objVarName + '.' + item + '.value');
                })(actionName, changeObj);
            }
            else{
                watchAll(obj[item], objVarName + '.' + item);
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