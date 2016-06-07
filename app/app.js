'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router'
    ,'myApp.dialog'
    ,'myApp.messagebox'
    ,'myApp.home'
    ,'ngAnimate'
    ,'ui.bootstrap'
    ,'color.picker'
    ,'ngDraggable'
])
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

.controller('AppCtrl', ['$scope', '$rootScope', '$uibModal', '$log',
    function($scope, $rootScope, $uibModal, $log) {
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
