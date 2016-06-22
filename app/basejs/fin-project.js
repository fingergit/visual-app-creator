/**
 * Created by laj on 2016/6/15.
 */

/**
 * APP 项目中的元素类型。
 */
var EFinProjElementType = {
    group: 'group'
    ,page: 'page'
    ,widget: 'widget'
};

/** APP项目中的Widget类型*/
var EFinProjWidgetType = {
    button: 'button'
    ,radio: 'radio'
    ,range: 'range'
    ,header: 'header'
    ,content: 'content'
    ,footer: 'footer'
};

var EFinProjWidgetDesc = {
    button: {isContainer: false, attr: 'SFinHeaderAttr.newInstance()', html: '<button id="{{widget.id}}" class="button button-positive">{{widget.name}}</button>'}
    ,radio: {isContainer: false, attr: 'SFinHeaderAttr.newInstance()', html: '<ion-list id="{{widget.id}}"><ion-radio ng-model="choice" ng-value="\'A\'">Choose A</ion-radio><ion-radio ng-model="choice" ng-value="\'B\'">Choose B</ion-radio></ion-list>'}
    ,range: {isContainer: false, attr: 'SFinHeaderAttr.newInstance()', html: '<ion-list id="{{widget.id}}"><ion-radio ng-model="choice" ng-value="\'A\'">Choose A</ion-radio><ion-radio ng-model="choice" ng-value="\'B\'">Choose B</ion-radio></ion-list>'}
    ,header: {isContainer: true, attr: 'SFinHeaderAttr.newInstance()', html: '<ion-header-bar id="{{widget.id}}" align-title="{{widget.textAlign}}" class="bar-{{widget.theme}}">{{widget.title}}</ion-header-bar>'}
    ,content: {isContainer: true, attr: 'SFinHeaderAttr.newInstance()', html: '<ion-content id="{{widget.id}}" class="has-header">{{{widgets.html}}</ion-content>'}
    ,footer: {isContainer: true, attr: 'SFinHeaderAttr.newInstance()', html: '<ion-footer-bar id="{{widget.id}}" align-title="left" class="bar-positive">{{{widgets.html}}}</ion-footer-bar>'}
};

var EFinProjectType = {
    blank: {type: 'blank', html: '<ion-pane>    <ion-header-bar class="bar-stable"><h1 class="title">空页面</h1></ion-header-bar>    <ion-content>    </ion-content></ion-pane>'}
    ,nav: {type: 'nav', html: '<ion-nav-bar class="bar-positive" no-tap-scroll="true"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view></ion-nav-view>'}
};

var EFinProjPageType = {
    blank: {type: 'blank', html: '<ion-view title="{{page.title}}" id="{{page.id}}" class=" "><ion-content padding="true" class="has-header">{{{page.content}}}</ion-content></ion-view>'}
};

// var EFinWidgetTemplate = {
//     button: {type: 'button', html: '<button class="button button-positive">{{widget.name}}</button>'}
//     ,footer: {type: 'footer', html: '<div class="bar bar-footer bar-balanced"><div class="title">{{widget.name}}</div></div>'}
// };

/**
 * 定义Widget属性
 * @param text 文本属性
 * @param position 位置属性
 * @param border 边框属性
 * @constructor 构造器。
 */
function SFinWidgetAttr(custom) {
    this.custom = custom;
    this.text = null;
    this.position = null;
    this.border = null;
}

SFinWidgetAttr.newInstance = function (custom) {
    return new SFinWidgetAttr(custom);
};

/**
 * App Project结构元素。
 * @param name
 * @param type
 * @param id
 * @constructor
 */
function SFinProjElement(name, type, id) {
    this.name = name;
    this.type = type;
    this.id = id;
    this.children = [];
}

function SFinPageGroup(name, id) {
    SFinProjElement.call(this, name, EFinProjElementType.group, id);
}
SFinPageGroup.prototype=new SFinProjElement();
SFinPageGroup.prototype.constructor=SFinPageGroup;

function SFinPage(name, id, pageType) {
    SFinProjElement.call(this, name, EFinProjElementType.page, id);
    this.pageType = pageType.type;
}
SFinPage.prototype=new SFinProjElement();
SFinPage.prototype.constructor=SFinPage;

function SFinPageWidget(name, id, attr, widgetType) {
    SFinProjElement.call(this, name, EFinProjElementType.widget, id);
    this.attr = attr;

    this.widgetType = widgetType;
    this.isContainer = EFinProjWidgetDesc[widgetType].isContainer;
}
SFinPageWidget.prototype=new SFinProjElement();
SFinPageWidget.prototype.constructor=SFinPageWidget;

function SFinTheme(){
}

/**
 * APP项目类。
 * @param name 项目名称
 * @param type 项目类型
 * @constructor
 */
function SFinProject(name, type){
    this.classId = 'FinProject'; // 用于标识此对象为一个Project（当从json字符串转换而来时）。
    this.type = type;
    this.name = name;
    this.theme = null;
    this.children = [];

    this.nextId = {}; // 当新添加一个元素时，此元素的id值。
    for (var idx in EFinProjElementType){
        if (!EFinProjElementType.hasOwnProperty(idx)){
            continue;
        }
        this.nextId[EFinProjElementType[idx]] = 1;
    }
    for (idx in EFinProjWidgetType){
        if (!EFinProjWidgetType.hasOwnProperty(idx)){
            continue;
        }
        this.nextId[EFinProjWidgetType[idx]] = 1;
    }
}

/**
 * 将新元素插入到参考元素的前面或后面。
 * @param element
 * @param parent
 * @param refElement
 * @param before
 */
SFinProject.insertElemByRefElem = function (element, parent, refElement, before) {
    var insertIdx = -1;
    // 查找refElement在parent中的位置。
    if (refElement !== null && refElement !== undefined){
        for (var idx in parent.children){
            if (!parent.children.hasOwnProperty(idx)){
                continue;
            }
            var child = parent.children[idx];
            if (refElement === child){
                insertIdx = idx;
                break;
            }
        }
    }

    SFinProject.insertElemByIdx(element, parent, insertIdx, before);
};

/**
 * 向父对象中指定位置插入元素，如果父对象为null或不提供，向project中插入。
 * @param element
 * @param parent
 * @param idx 插入位置索引值。-1或未定认：插入到最后。
 * @param before true: 插入到索引位置，false: 插入到索引位置的下一位置。
 */
SFinProject.insertElemByIdx = function (element, parent, idx, before) {
    if (!element){
        return;
    }

    if (idx === undefined || idx === -1){
        parent.children.push(element);
    }
    else{
        idx = before ? idx : idx + 1;
        parent.children.splice(idx, 0, element);
    }
};

/**
 * 从父对象中删除元素。
 * @param elem
 * @param parent
 */
SFinProject.removeElem = function (elem, parent) {
    if (!elem){
        return;
    }

    var ary = parent.children;

    for (var idx in ary){
        if (!ary.hasOwnProperty(idx)){
            continue;
        }
        var child = ary[idx];
        if (child === elem){
            ary.splice(idx, 1);
            break;
        }
    }
};

SFinProject.getIndexInParent = function (elem, parent) {
    var ary = parent.children;

    var retIdx = -1;
    for (var idx in ary){
        if (!ary.hasOwnProperty(idx)){
            continue;
        }
        var child = ary[idx];
        if (child === elem){
            retIdx = idx;
            break;
        }
    }

    return retIdx;
};

/**
 * 项目转换为JSON字符串
 * @param project
 * @returns {string|undefined}
 */
SFinProject.toJson = function (project) {
    // var jsonStr = JSON.stringify(this);
    return angular.toJson(project); // 防止字符串中出现$$hashkey。
};

/**
 * 从JSON字符串转换为项目。
 * @param jsonStr
 */
SFinProject.fromJson = function (jsonStr) {
    return JSON.parse(jsonStr);
};

/**
 * 新建一个Page组。
 * @param name
 * @param proj
 * @returns {SFinProjElement}
 */
SFinProject.newGroup = function (name, proj) {
    var id = EFinProjElementType.group + proj.nextId[EFinProjElementType.group];
    proj.nextId[EFinProjElementType.group] ++;

    return new SFinPageGroup(name, id);
};

/**
 * 新建一个页面。
 * @param name 页面名称。
 * @param proj 所在SFinProject。
 * @returns {SFinPage}
 */
SFinProject.newPage = function (name, proj, pageType) {
    var id = EFinProjElementType.page + proj.nextId[EFinProjElementType.page];
    proj.nextId[EFinProjElementType.page] ++;

    return new SFinPage(name, id, pageType);
};

/**
 * 新建一个Widget
 * @param name 名称
 * @param proj 所在Project。
 * @param widgetType widget类型
 * @param attr
 * @param isContainer 是否为容器
 * @returns {SFinPageWidget}
 */
SFinProject.newWidget = function (name, proj, widgetType, attr) {
    var id = widgetType + proj.nextId[widgetType];
    proj.nextId[widgetType] ++;

    return new SFinPageWidget(name, id, attr, widgetType);
};

/**
 * 查找元素的父对象。
 * @param elem
 * @param root 从哪个父位置开始查找。如查找Widget，root应为page。
 * @returns {*} 找不到，返回null。
 */
SFinProject.findParent = function (elem, root) {
    var parent = null;
    for (var idx in root.children){
        if (!root.children.hasOwnProperty(idx)){
            continue;
        }
        var item = root.children[idx];
        if (item === elem){
            parent = root;
            break;
        }
        else{
            parent = SFinProject.findParent(elem, item);
            if (null != parent){
                break;
            }
        }
    }

    return parent;
};

/**
 * 查找元素所在页面。
 * @param elem
 */
SFinProject.getPage = function (elem, project) {
    var page = null;
    if (elem.type === EFinProjElementType.group){
        return null;
    }
    else if (elem.type === EFinProjElementType.page){
        return elem;
    }
    else{
        for (var idx in project.children){
            if (!project.children.hasOwnProperty(idx)){
                continue;
            }

            var item = project.children[idx];
            if (item.type === EFinProjElementType.page){
                var parent = SFinProject.findParent(elem, item);
                if (parent){
                    page = parent;
                    break;
                }
            }
            else if (item.type === EFinProjElementType.group){
                page = SFinProject.getPage(elem, item);
                if (null !== page){
                    break;
                }
            }
        }
    }

    return page;
};

/**
 * 获取Project中的所有页面。
 * @param root
 * @returns {Array}
 */
SFinProject.getAllPages = function (root) {
    var pages = [];
    for (var page in root.children){
        if (!root.children.hasOwnProperty(page)){
            continue;
        }
        var item = root.children[page];
        if (item.type === EFinProjElementType.page){
            pages.push(item);
        }
        else if (item.type == EFinProjElementType.group){
            var subpages = SFinProject.getAllPages(item);
            pages = pages.concat(subpages);
        }
    }

    return pages;
};

/**
 * 将当前页面的控件都渲染出来，这里是测试。
 * @param root 外部调用时，是page; 递归中，是控件。
 * @returns {string}
 */
SFinProject.renderPage = function (root) {
    var html = '';
    if (root.type === EFinProjElementType.widget){
        var htmlTpl = EFinProjWidgetDesc[root.widgetType].html;
        var template = Handlebars.compile(htmlTpl);

        var context = null;
        switch (root.widgetType){
            case EFinProjWidgetType.button:
                context = {
                    widget: {id: root.id, name: root.name}
                };
                break;
            case EFinProjWidgetType.radio:
                context = {
                    widget: {}
                };
                break;
            case EFinProjWidgetType.header:
                context = {
                    widget: {id: root.id, textAlign:root.attr.custom.titleAlign.value, theme: root.attr.custom.theme.value, title: root.attr.custom.title}
                };
                break;
            // TODO: 每个widget根据情况来定占位符。
            default:
                context = {};
                break;
        }
        if (root.isContainer){
            var childHtml = '';
            for (var childIdx in root.children){
                childHtml += SFinProject.renderPage(root[childIdx]);
            }

            // TODO: 每个widgetContainer中都要有一个widgets占位符。
            context.widgets = {html: childHtml};
        }
        html += template(context);
    }
    else{
        for (var widget in root.children){
            if (!root.children.hasOwnProperty(widget)){
                continue;
            }
            var item = root.children[widget];
            if (item.type !== EFinProjElementType.widget){
                continue;
            }
            html += SFinProject.renderPage(item);
        }
    }

    return html;
};
