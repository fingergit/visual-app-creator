'use strict';

angular.module('myApp.home',['myApp.home.toolbar','myApp.home.leftpanel','myApp.home.rightpanel'])

.config(['$stateProvider', function($stateProvider) {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var splitter = new FinSplitter();
    splitter.init();

    $rootScope.proj = {
        userId: 'zhangsan'
        ,elements: [{
            name: 'elem1'
            , type: 'button'
            , id: 'elem1-button'
            , propText : {
                align: {desc: $rootScope.propTextDesc.align, value: 'center'}
                ,size: {comb: true, desc: $rootScope.propTextDesc.size, value: {desc: $rootScope.propTextDesc.size.value, value: 10}
                    ,unit: {desc: $rootScope.propTextDesc.size.unit, value: 'pt'}}
                ,color: {desc: $rootScope.propTextDesc.color, value: '#FFFF00'}
                ,backColor: {desc: $rootScope.propTextDesc.backColor, value: '#00FF00'}
                ,position: {desc: $rootScope.propTextDesc.position, value: 'relative'}
                ,left: {desc: $rootScope.propTextDesc.left, value: '0'}
                ,visible: {desc: $rootScope.propTextDesc.visible, value: 'true'}
                ,width: {comb: true, desc: $rootScope.propTextDesc.width, value: {desc: $rootScope.propTextDesc.width.value, value: 100}
                    ,unit: {desc: $rootScope.propTextDesc.width.unit, value: 'px'}}
            }
        }]
    };

    $rootScope.selElem = $rootScope.proj.elements[0];
    
    $scope.onDropComplete = function (obj, event) {
        var target = $(event.event.target);
        var tx = target.position().left;
        var ty = target.position().top;
        var newElem = $("<div>" + obj.name + "</div>");
        newElem.appendTo(event.event.target);
        newElem.css("position", "absolute");
        var elemX = event.x - tx;
        var elemY = event.y - ty;
        newElem.css("left", elemX + "px");
        newElem.css("top", elemY + "px");
        newElem.css("color", "red");
    }
}])

.directive('finToolbar', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/toolbar.html'
    };
})

.directive('finLeftPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/leftpanel.html'
    };
})

.directive('finProjectPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/projectpanel.html'
    };
})

.directive('finWidgetPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/widgetpanel.html'
    };
})

.directive('finWidgetIcon', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/widgeticon.html'
    };
})

.directive('finRightPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/rightpanel.html'
    };
})

.directive('finPropTextPanel', function() {
    return {
        restrict: 'E'
        ,templateUrl: './home/prop-text.html'
    };
})

.directive('finDrag', ['$rootScope', '$parse', '$document', '$window', '$compile', function($rootScope, $parse, $document, $window, $compile) {
    return {
        restrict: 'A'
        ,link: function (scope, element, attrs) {
            element.attr('draggable', true);
            element.on('dragstart', function (e) {
                // var text = '<label class="toggle"><input type="checkbox"><div class="track"><div class="handle"></div></div></label>';
                var target = e.originalEvent.srcElement || e.originalEvent.target;
                var type = $(target).data('widget-type');
                e.originalEvent.dataTransfer.setData('text/plain', angular.toJson(EFinProjWidgetType[type]));

                // var backImg = $(e.target).find(".widget:first-child").css("background-image");
                // backImg = backImg.slice(5,backImg.length-2);
                // var $img = $("<img src='" + backImg + "'>");
                // e.originalEvent.dataTransfer.setDragImage($img[0], 0, 0);

                // e.originalEvent.dataTransfer.effectAllowed = "move";
                return true;
            });
        }
    };
}])

.directive('finAppFrame', ['$rootScope', '$parse', '$document', '$window', '$compile', 'FinProjectRender', 'ActionManager', 'FinSelection'
    , function($rootScope, $parse, $document, $window, $compile, FinProjectRender, ActionManager, FinSelection) {
    return {
        restrict: 'A'
        ,link: function (scope, element, attrs) {
            element.load(function () {
                var frameName = element.attr('name');
                var appFrame = window.frames[frameName];
                var $body = $(window.frames[frameName].document).find('body');
                var appDoc = window.frames[frameName].document;
                $body.on('dragover', function (e) {
                    e.preventDefault();

                    return false;
                });
                $body.on('drop', function (e) {
                    var widgetType = e.originalEvent.dataTransfer.getData('text/plain');
                    widgetType = JSON.parse(widgetType);

                    var target = e.originalEvent.srcElement || e.originalEvent.target;
                    // var $elem = $(widgetType.html);
                    // $elem.appendTo($(target));
                    //
                    // var okHtml = window.frames[frameName].compileElement(widgetType.html);
                    // var $elem = $(okHtml);
                    // $elem.appendTo($(target));

                    // var okHtml = $compile(widgetType.html)($rootScope);
                    // $(target).append($(okHtml));
                    // var okHtml = angular.bootstrap($(target));
                    // $(target).append($(okHtml));

                    var attr = SFinWidgetAttr.newInstance(EFinProjWidgetDesc[widgetType].attr ? eval(EFinProjWidgetDesc[widgetType].attr) : null);
                    var newWidget = SFinProject.newWidget('added' + $rootScope.idx, $rootScope.project, widgetType, attr);
                    var html = SFinProject.renderPage(newWidget);

                    var okHtml = window.frames[frameName].compileElement(html);
                    var $elem = $(okHtml);
                    $elem.appendTo($(target));

                    var action = new AddWidgetAction($rootScope, '添加控件', newWidget, $rootScope.selectedElem);
                    ActionManager.addAction(action);
                    $rootScope.idx ++;
                });

                $rootScope.frameBody = $body;
                // FinProjectRender.render($rootScope.project, $body);

                // $body.on('click', function (e) {
                //     var target = e.originalEvent.srcElement || e.originalEvent.target;
                //     alert($(target).html());
                // })
            });
        }
    };
}])
;