'use strict';

// Declare app level module which depends on views, and components
var finApp = angular.module('myApp', [
  'ui.router'
    ,'myApp.dialog'
    ,'myApp.messagebox'
    ,'myApp.common'
    ,'myApp.home'
    ,'myApp.constrols'
    ,'ngAnimate'
    ,'ngResource'
    ,'ui.bootstrap'
    ,'rzModule'
    ,'color.picker'
    ,'ngDraggable'
    ,'uiSwitch'
    ,'treeControl'
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
                }, clear: function () {
                    actionMgr.clear();
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
.factory('FinProject', ["ActionManager", function(ActionManager){
    var proj = new SFinProject('first', EFinProjectType.nav.type);
    var projList = [];

    var group = SFinProject.newGroup('user', proj);
    var loginPage = SFinProject.newPage('loginPage', proj, EFinProjPageType.blank);
    var getPassPage = SFinProject.newPage('getPassPage', proj, EFinProjPageType.blank);
    SFinProject.insertElemByIdx(group, proj);
    SFinProject.insertElemByRefElem(getPassPage, group);
    SFinProject.insertElemByRefElem(loginPage, group, getPassPage, true);
    var button = SFinProject.newWidget('login', proj, EFinProjWidgetType.button, null, false);
    var getPassButton = SFinProject.newWidget('getPass', proj, EFinProjWidgetType.button, null, false);
    SFinProject.insertElemByRefElem(button, loginPage);
    SFinProject.insertElemByRefElem(getPassButton, loginPage, button, false);


    return {
        /**
         * 新建工程
         */
        newProject: function (name) {
            proj = new SFinProject(name, EFinProjectType.blank.type);
            ActionManager.clear();

            return proj;
        }

        // 从服务器获取流水项。
        ,requestProject: function() {
            return proj;
        }

        /**
         * 打开项目。
         * @param 项目名称。
         * @returns {boolean} 成功，返回打开的project，失败，返回false。
         * @param name
         * @returns {*}
         */
        ,openProject: function (name) {
            if (!name){
                return false;
            }

            var jsonStr = window.localStorage['proj-' + name];
            if (!jsonStr){
                return false;
            }

            var newProj = SFinProject.fromJson(jsonStr);
            if (!newProj || !newProj.hasOwnProperty('classId')){
                return false;
            }

            // 先保存当前项目。
            this.saveProject();
            proj = newProj;
            ActionManager.clear();

            return proj;
        }

        /**
         * 保存项目。
         * @returns {boolean} 成功返回true。
         */
        ,saveProject: function () {
            if (!proj){
                return false;
            }

            window.localStorage['proj-' + proj.name] = SFinProject.toJson(proj);
            return true;
        }

        /**
         * 另存为项目。
         * @returns {boolean} 成功返回true。
         */
        ,saveAsProject: function (name) {
            if (!proj){
                return false;
            }
            if (this.projectExist(name)){
                return false;
            }

            this.saveProject(); // 先保存当前项目。

            if (name === proj.name){
                return true;
            }

            proj.name = name;
            window.localStorage['proj-' + name] = SFinProject.toJson(proj);
            return true;
        }

        /**
         * 判断项目文件是否存在
         * @param name 项目名称。
         * @returns {boolean} 成功true。
         */
        ,projectExist: function (name) {
            var exist = false;
            for (var idx in projList){
                if (!projList.hasOwnProperty(idx)){
                    continue;
                }
                var item = projList[idx];
                if (item.name === name){
                    exist = true;
                    break;
                }
            }
            return exist;
        }
        ,projectList: function () {
            var storage = window.localStorage;
            var projNameList = [];
            for (var item in storage){
                if (!storage.hasOwnProperty(item)){
                    continue;
                }
                if (item.substring(0, 5) === 'proj-'){
                    projNameList.push(item.substring(5));
                }
            }

            return projNameList;
        }
    }
}])
.factory('FinProjectRender', ["ActionManager", '$compile', '$rootScope', '$http'
    , function(ActionManager, $compile, $rootScope, $http){
    return {
        render: function (project, $htmlBody, defPageId) {
            // if (!$htmlBody){
            //     return;
            // }
            var projectHtml = EFinProjectType[project.type].html;
            var totalHtml = projectHtml;
            var totalRouteCode = '';
            var defPage = null;

            var pages = SFinProject.getAllPages(project);
            for (var idx in pages){
                if (!pages.hasOwnProperty(idx)){
                    continue;
                }
                var item = pages[idx];
                var pageHtml = EFinProjPageType[item.pageType].html;
                pageHtml = '<script id="templates/{{page.id}}.html" type="text/ng-template">' + pageHtml + '</script>';
                var routeCode = ".state('{{page.id}}', {\
                url: '/{{page.id}}', \
                    templateUrl: 'templates/{{page.id}}.html' \
            })";

                if (!defPage){
                    if (!defPageId){
                        defPage = "/" + item.id;
                    }
                    else{
                        defPage = "/" + defPageId;
                    }
                }

                var template = Handlebars.compile(pageHtml);
                var context = {
                    page: {title: item.name
                        ,id: item.id
                        ,content: SFinProject.renderPage(item)}
                };
                totalHtml += template(context);

                template = Handlebars.compile(routeCode);
                totalRouteCode += template(context);
            }

            var tpl = document.getElementById('pageRoute');
            var source = tpl.innerHTML;
            var totalRouteCode2 = Handlebars.compile(source);
            var context2 = {
                state: {
                    pageList: totalRouteCode
                    ,defPage: defPage
                    ,defPageId: defPageId
                }
            };
            totalRouteCode2 = totalRouteCode2(context2);

            totalHtml = totalHtml + "<script>" + totalRouteCode2 + "</script>";
            // var okHtml = $compile(totalHtml)($rootScope);
            // $htmlBody.append(okHtml.text());

            $http({
                method: 'POST',
                url: '/visualapp/index.php/index/frame',
                data: {html: totalHtml},
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data,header,config,status){
                // $rootScope.frameBody.append("<div>" + data.name + "</div>");
                window.frames["appframe"].location.reload(true);
            }).error(function(data,header,config,status){
            });

            return totalHtml;
        }
    }
}])
.factory('FinSelection', ['$rootScope'
    , function($rootScope){
    return {
        group: null
        , page: null
        , element: null
        , attr: null
    }
}])

.controller('AppCtrl', ['$scope', '$rootScope', '$uibModal', '$log', 'Hotkeys', 'FinProject', 'ActionManager', 'FinProjectRender',
    '$resource','$http','FinSelection'
    ,function($scope, $rootScope, $uibModal, $log, Hotkeys, FinProject, ActionManager, FinProjectRender, $resource,$http,FinSelection) {
        Hotkeys.regist();
        $rootScope.project = FinProject.requestProject();

        $rootScope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
        
        // 禁止浏览器自身的ctrl+z执行的undo。
        $(window).bind('keydown', function(evt) {
            if((evt.ctrlKey || evt.metaKey) && String.fromCharCode(evt.which).toLowerCase() == 'z') {
                evt.preventDefault();
            }
        });

        $rootScope.newProject = function () {
            // 使用resource方法
            // var User = $resource('/visualapp/index.php/index/frame', {userId:'@id'});
            // User.save({id: '123'}, {a: 'a'}, function (user) {
            //     console.log("success");
            // }, function (e) {
            //     console.log('error');
            // });

            // 使用$http方法
            // $http({
            //     method: 'POST',
            //     url: '/visualapp/index.php/index/frame',
            //     data: {html: FinProjectRender.render($rootScope.project, null)},
            //     // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            // }).success(function(data,header,config,status){
            //     // $rootScope.frameBody.append("<div>" + data.name + "</div>");
            //     window.frames["appframe"].location.reload(true);
            // }).error(function(data,header,config,status){
            // });

            return;

            $rootScope.showInputDialog('新建项目', '项目名称', 'text', '', function (value) {
                var newProj = FinProject.newProject(value);
                if (!newProj){
                    $rootScope.alert("新建项目失败");
                    return;
                }
                $rootScope.project = newProj;
                // FinProjectRender.render(newProj);
            });
        };

        $rootScope.openProject = function () {
            $rootScope.showProjectList(function (name) {
               if (!name){
                   return;
               }

                var newProj = FinProject.openProject(name);
               if (!newProj){
                   $rootScope.alert("打开项目失败");
                   return;
               }
                $rootScope.project = newProj;
            });
        };

        $rootScope.saveProject = function () {
            FinProject.saveProject();
        };

        $rootScope.saveAsProject = function () {
            $rootScope.showInputDialog('另存为...', '项目名称', 'text', '', function (value) {
                var newProj = FinProject.saveAsProject(value);
                if (!newProj){
                    $rootScope.alert("另存项目失败");
                    return;
                }
                $rootScope.project = newProj;
            });
        };

        $rootScope.undo = function () {
            ActionManager.undo();
        };

        $rootScope.redo = function () {
            ActionManager.redo();
        };

        $rootScope.canUndo = function () {
            return ActionManager.canUndo();
        };

        $rootScope.canRedo = function () {
            return ActionManager.canRedo();
        };

        $rootScope.defaultEnable = function () {
            return true;
        };
        $rootScope.attrTab = [
            {name: '自定义', type: 'custom', value: ($rootScope.selectedElem && $rootScope.selectedElem.attr) ? $rootScope.selectedElem.attr.custom : null}
            ,{name: '文本', type: 'text', value: ($rootScope.selectedElem && $rootScope.selectedElem.attr) ? $rootScope.selectedElem.attr.text : null}
            ,{name: '位置', type: 'position', value: ($rootScope.selectedElem && $rootScope.selectedElem.attr) ? $rootScope.selectedElem.attr.position : null}
            ,{name: '边框', type: 'border', value: ($rootScope.selectedElem && $rootScope.selectedElem.attr) ? $rootScope.selectedElem.attr.border : null}
        ];

        $rootScope.selectedElem = null;
        $rootScope.$watch('selectedElem', function (newValue,oldValue, scope) {
            if (newValue === oldValue){
                return;
            }
            if (!newValue){
                return;
            }

            if (newValue){
                switch (newValue.type){
                    case EFinProjElementType.page:
                        FinProjectRender.render($rootScope.project, null, newValue.id);
                        break;
                    case EFinProjElementType.widget:
                        FinSelection.attr = [
                            {name: '自定义', type: 'custom', value: (newValue.attr) ? newValue.attr.custom : null}
                            ,{name: '文本', type: 'text', value: (newValue.attr) ? newValue.attr.text : null}
                            ,{name: '位置', type: 'position', value: (newValue.attr) ? newValue.attr.position : null}
                            ,{name: '边框', type: 'border', value: (newValue.attr) ? newValue.attr.border : null}
                        ];

                        FinSelection.page = SFinProject.getPage(newValue, $rootScope.project);
                        FinSelection.element = newValue;
                        break;
                }
            }

            $rootScope.selectedElemParent = SFinProject.findParent($rootScope.selectedElem, $rootScope.project);
        });

        $rootScope.idx = 1;
        $rootScope.addWidget = function (event) {
            if (!$rootScope.selectedElem || $rootScope.selectedElem.type !== EFinProjElementType.page){
                return;
            }
            var newBtn = SFinProject.newWidget('added' + $rootScope.idx, $rootScope.project, EFinProjElementType.button, null);
            var action = new AddWidgetAction($rootScope, '添加控件', newBtn, $rootScope.selectedElem);
            ActionManager.addAction(action);
            $rootScope.idx ++;
        };

        $rootScope.delWidget = function (event) {
            if (!$rootScope.selectedElem){
                return;
            }

            var action = new DelWidgetAction($rootScope, '删除控件', $rootScope.selectedElem, $rootScope.selectedElemParent);
            ActionManager.addAction(action);
        };

        $rootScope.confirm = function (content,title) {
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
        };

        $rootScope.alert = function (content,title) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './dialog/alertbox.html',
                size: '',
                controller: function ($uibModalInstance, $scope) {
                    $scope.dlgParam = {
                        title: title||"提示"
                        , content: content
                    };

                    $scope.dlgTitle = title||"提示";
                    $scope.dlgContent = content||"world";
                    $scope.ok = function () {
                        $uibModalInstance.close();
                        $scope.dlgParam = null;
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                        $scope.dlgParam = null;
                    };
                }
            });

            modalInstance.result.then(function () {
            }, function () {
            });
        };

        $rootScope.showInputDialog = function (title, label, type, value, okCallback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './dialog/inputdialog.html',
                size: '',
                controller: function ($uibModalInstance, $scope) {
                    $rootScope.input = {
                        title: title
                        , label: label
                        , type: type
                        , value: value
                    };

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });

            modalInstance.result.then(function () {
                okCallback($rootScope.input.value);
                $rootScope.input = null;
            }, function () {
                $rootScope.input = null;
            });
        };

        $rootScope.showProjectList = function (okCallback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './dialog/projectlist.html',
                size: '',
                controller: function ($uibModalInstance, $scope) {
                    $scope.theProjList = FinProject.projectList();

                    $scope._openProject = function (name) {
                        $uibModalInstance.close();
                        okCallback(name);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });

            modalInstance.result.then(function () {
            }, function () {
            });
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
