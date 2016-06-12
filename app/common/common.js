'use strict';

angular.module('myApp.common',[])

// 修改颜色属性
.directive('finPropColor', function() {
    return {
        restrict: 'E'
        ,scope: {
            label: "="  // @: 颜色label。 （字符串，单向绑定）
            ,ngModel: "="     // =: 颜色值。引用传递（双向绑定）
        }
        ,templateUrl: './common/prop-color.html'
    };
})
    // 输入框属性
.directive('finPropInput', function() {
    return {
        restrict: 'E'
        ,scope: {
            label: "="     // @: input标签。 （页面要传model值）
            ,name: "@"     // input name （页面上直接显示输入的内容）
            ,type: "@"     // input type
            ,ngModel: "="  // input对应的数据模型
        }
        ,templateUrl: './common/prop-input.html'
    };
})
    // 带单位的输入框属性
.directive('finPropInputUnit', function() {
    return {
        restrict: 'E'
        ,scope: {
            label: "="     // =: input标签。 （字符串，双向绑定）
            ,name: "@"     // input name
            ,type: "@"     // input type
            ,unitValue: "="
            ,unitValueRange: "="
            ,ngModel: "="  // input对应的数据模型
        }
        ,templateUrl: './common/prop-input-unit.html'
        ,link: function ($scope, element, attrs, control) {
            $scope.onUnitClick = function(item){
                $scope.unitValue = item;
                }
        }
    };
})
    // 
.directive('finPropRadioButton', function() {
    return {
        restrict: 'E'
        ,scope: {
            label: "="     // =: radio标签
            ,valueRange: "="
            ,ngModel: "="
        }
        ,templateUrl: './common/prop-radio-button.html'
    };
})
// 下拉框属性
.directive('finPropCombox', function() {
    return {
        restrict: 'E'
        ,scope: {
            label: "="     // =: input标签。 （字符串，双向绑定）
            ,valueRange: "="
            ,ngModel: "="  // input对应的数据模型
        }
        ,templateUrl: './common/prop-combox.html'
        ,link: function ($scope, element, attrs, control) {
            $scope.onItemClick = function(item){
                $scope.ngModel = item;
            }
        }
    };
})
// 开关属性
.directive('finPropSwitch', function() {
    return {
        restrict: 'E'
        ,scope: {
            label: "="     // =: input标签。 （字符串，双向绑定）
            ,ngModel: "="  // input对应的数据模型
        }
        ,templateUrl: './common/prop-switch.html'
    };
})
;