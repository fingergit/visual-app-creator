'use strict';

angular.module('myApp.constrols',[])

// 修改颜色属性
.directive('finButton', function() {
    return {
        restrict: 'E'
        ,scope: {
            ngModel: "="     // =: 颜色值。引用传递（双向绑定）
            ,propText: "="
            ,id: "="
        }
        ,templateUrl: './controls/button.html'
    };
})
;