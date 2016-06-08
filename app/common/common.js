'use strict';

angular.module('myApp.common',[])

.directive('finPropColor', function() {
    return {
        restrict: 'E'
        ,scope: {
            colorName: "@" // @: 值传递 （字符串，单向绑定）
            ,color: "@" // =: 引用传递（双向绑定）
        }
        ,templateUrl: './common/prop-color.html'
    };
})
;