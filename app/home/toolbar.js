'use strict';

angular.module('myApp.home.toolbar',[])

.config([function() {
  // $routeProvider.when('/view2', {
  //   templateUrl: 'view2/home.html',
  //   controller: 'View2Ctrl'
  // });
}])

.controller('ToolbarCtrl', ['$scope', '$window', '$uibModal', '$log',
    function($scope, $window, $uibModal, $log) {
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    $scope.toolItems = [
        [{name: '新建项目', icon: 'fa-file', itemId: 'newProj'}
            ,{name: '打开项目', icon: 'fa-folder-open', itemId: 'openProj'}
            ,{name: '保存项目', icon: 'fa-save', itemId: 'saveProj'}]
        ,[{name: 'Undo', icon: 'fa-mail-reply', itemId: 'undo'}
            ,{name: 'Redo', icon: 'fa-mail-forward', itemId: 'redo'}
        ]
        ,[{name: '复制', icon: 'fa-copy', itemId: 'copy'}
            ,{name: '剪切', icon: 'fa-cut', itemId: 'cut'}
            ,{name: '粘贴', icon: 'fa-paste', itemId: 'paste'}
            ,{name: '删除', icon: 'fa-remove', itemId: 'delete'}
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