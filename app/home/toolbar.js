'use strict';

angular.module('myApp.home.toolbar',[])

.config([function() {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('ToolbarCtrl', ['$scope', '$rootScope', '$window', '$uibModal', '$log',
    function($scope, $rootScope, $window, $uibModal, $log) {
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    $scope.toolItems = [
        [{name: '新建项目', icon: 'fa-file', itemId: 'newProj', onClick: $rootScope.newProject, enable: $rootScope.defaultEnable}
            ,{name: '打开项目', icon: 'fa-folder-open', itemId: 'openProj', onClick: $rootScope.openProject, enable: $rootScope.defaultEnable}
            ,{name: '保存项目', icon: 'fa-save', itemId: 'saveProj', onClick: $rootScope.saveProject, enable: $rootScope.defaultEnable}
            ,{name: '另存项目', icon: 'fa-save', itemId: 'saveAsProj', onClick: $rootScope.saveAsProject, enable: $rootScope.defaultEnable}
        ]
        ,[{name: 'Undo', icon: 'fa-mail-reply', itemId: 'undo', onClick: $rootScope.undo, enable: $rootScope.canUndo}
            ,{name: 'Redo', icon: 'fa-mail-forward', itemId: 'redo', onClick: $rootScope.redo, enable: $rootScope.canRedo}
        ]
        ,[{name: '复制', icon: 'fa-copy', itemId: 'copy', enable: $rootScope.defaultEnable}
            ,{name: '剪切', icon: 'fa-cut', itemId: 'cut', enable: $rootScope.defaultEnable}
            ,{name: '粘贴', icon: 'fa-paste', itemId: 'paste', enable: $rootScope.defaultEnable}
            ,{name: '删除', icon: 'fa-remove', itemId: 'delete', enable: $rootScope.defaultEnable}
        ]
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

    $scope.model = {
        name: 'Tabs'
    };
}])
;