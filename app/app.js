'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router'
    ,'myApp.dialog'
    ,'myApp.messagebox'
    ,'myApp.home'
    ,'ngAnimate'
    ,'ui.bootstrap'
    ,'rzModule'
    ,'color.picker'
    ,'ngDraggable'
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
    }])
;
