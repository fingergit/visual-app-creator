'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router'
    ,'myApp.dialog'
    ,'myApp.messagebox'
    ,'myApp.common'
    ,'myApp.home'
    ,'myApp.constrols'
    ,'ngAnimate'
    ,'ui.bootstrap'
    ,'rzModule'
    ,'color.picker'
    ,'ngDraggable'
    ,'uiSwitch'
])
.provider("ActionManager", [function () {
    var e = {}, t = [], n = [];
    var actionMgr = new ActionManager();
    return {
        $get: ["$rootScope", function (i) {
            return {
                addAction: function (action) {
                    actionMgr.addAction(action);
                }, canUndo: function () {
                    return actionMgr.canUndo();
                }, canRedo: function () {
                    return actionMgr.canRedo();
                }, undo: function () {
                    actionMgr.undo();
                }, redo: function () {
                    actionMgr.redo();
                }
            }
        }]
    }
}])
.factory("Hotkeys", ["$state", "$rootScope", "ActionManager", function ($state, $rootScope, ActionManager){
    return {
        regist: function () {
            // returning false stops the event and prevents default browser events
            // https://github.com/madrobby/keymaster
            key("esc", function (e) {
                alert('you pressed a!'); return false;
            });
            key("delete, backspace", function (e) {
                alert('you pressed delete!');
            }), key("ctrl+s, ⌘+s", function (e) {
                alert('you pressed delete!');
            }), key("ctrl+c, ⌘+c", function (t) {
                alert('you pressed delete!');
            }), key("ctrl+x, ⌘+x", function (e) {
                alert('you pressed delete!');
            }), key("ctrl+v, ⌘+v", function (e) {
                alert('you pressed delete!');
            }), key("ctrl+d, ⌘+d", function (e) {
                alert('you pressed delete!');
            }), key("ctrl+z, ⌘+z", function (e) {
                ActionManager.undo();
            }), key("ctrl+shift+z,⌘+shift+z,ctrl+y,⌘+y", function (e) {
                ActionManager.redo();
            });
        }
    }
}])
.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  // $locationProvider.hashPrefix('!');

  // $routeProvider.otherwise({redirectTo: '/view1'});

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: 'home/home.html'
          ,controller: 'HomeCtrl'
      })
      .state('state1', {
        url: "/state1",
        templateUrl: "state1/state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "state1/state1.list.html",
        controller: function($scope) {
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "state2/state2.html"
      })
      .state('state2.list', {
        url: "/list",
        templateUrl: "state2/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      });
}])

.controller('AppCtrl', ['$scope', '$rootScope', '$uibModal', '$log', 'Hotkeys',
    function($scope, $rootScope, $uibModal, $log, Hotkeys) {
        Hotkeys.regist();

        // 禁止浏览器自身的ctrl+z执行的undo。
        $(window).bind('keydown', function(evt) {
            if((evt.ctrlKey || evt.metaKey) && String.fromCharCode(evt.which).toLowerCase() == 'z') {
                evt.preventDefault();
            }
        });

        $scope.confirm = function (content,title) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './dialog/messagebox.html',
                size: '',
                controller: function ($uibModalInstance, $scope) {
                    $scope.dlgTitle = title||"提示";
                    $scope.dlgContent = content||"world";
                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });

            modalInstance.result.then(function () {
                $log.info('OK.' + new Date());
            }, function () {
                $log.info('Cancel');
            });
            // var modalInstance = $uibModal.open({
            //     animation: true,
            //     templateUrl: './dialog/dialogContent.html',
            //     controller: 'DialogCtrl',
            //     size: '',
            //     resolve: {
            //         items: function () {
            //             return $scope.items;
            //         }
            //     }
            // });
            //
            // modalInstance.result.then(function (selectedItem) {
            //     $scope.selected = selectedItem;
            // }, function () {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });
        };

        initProps();

        function initProps() {
            $rootScope.propTextDesc = {
                align: {name: '对齐', actionName: '对齐', type: 'enumButton', typeRange: [
                    {value: 'left', icon: 'fa-align-left'}
                    ,{value: 'center', icon: 'fa-align-center'}
                    ,{value: 'right', icon: 'fa-align-right'}
                    ,{value: 'justify', icon: 'fa-align-justify'}
                ]}
                , size: {type: 'numberWithUnit', value: {name: '尺寸', actionName: '尺寸', type: 'number', min: 0, max: 999},
                    unit: {name: '尺寸单位', actionName: '尺寸单位', type: 'enum', typeRange: ['px','pt']}}
                ,color: {name: '颜色', actionName: '文字颜色', type: 'color'}
                ,backColor: {name: '背景色', actionName: '背景颜色', type: 'color'}
                ,position: {name: '位置', actionName: '位置', type: 'enum', typeRange: ['static','relative', 'absolute', 'fixed']}
                ,left: {name: '左', actionName: '左', type: 'input', subType: 'number'}
                ,visible: {name: '显示', actionName: '显示', type: 'bool'}
                ,width: {type: 'numberWithUnit', value: {name: '宽度', actionName: '宽度', type: 'number', min: 0, max: 999},
                    unit: {name: '宽度单位', actionName: '宽度单位', type: 'enum', typeRange: ['px','%']}}
            };
        }
    }])
;
