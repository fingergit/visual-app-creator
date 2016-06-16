/**
 * Created by laj on 2016/6/15.
 */

var EFinWidgetType = {
    group: 'group'
    ,page: 'page'
    ,button: 'button'
};

var EFinProjectType = {
    blank: {type: 'blank', html: '<ion-pane>    <ion-header-bar class="bar-stable"><h1 class="title">Ionic Blank Starter</h1>    </ion-header-bar>    <ion-content>    </ion-content></ion-pane>'}
};

var EFinPageTemplate = {
    blank: {type: 'blank', html: '<ion-view title="{{page.title}}" id="{{page.id}}" class=" "><ion-content padding="true" class="has-header"></ion-content></ion-view>'}
};

/**
 * 定义Widget属性
 * @param text 文本属性
 * @param position 位置属性
 * @param border 边框属性
 * @constructor 构造器。
 */
function SFinWidgetAttr(text, position, border) {
    this.text = text;
    this.position = position;
    this.border = border;
}

/**
 * 定义一个控件元素。
 * @constructor
 */
function SFinWidget(name, type, id, attr) {
    this.name = name;
    this.type = type;
    this.id = id;
    this.attr = attr;
    this.text = null;
    this.children = [];
}

function SFinTheme(){
}

function SFinProject(name, type){
    this.classId = 'FinProject';
    this.type = type;
    this.name = name;
    this.theme = null;
    this.children = [];

    this.nextId = {};
    for (var idx in EFinWidgetType){
        if (!EFinWidgetType.hasOwnProperty(idx)){
            continue;
        }
        this.nextId[EFinWidgetType[idx]] = 1;
    }
}

SFinProject.insertWidgetByWidget = function (widget, parent, targetWidget, before) {
    var insertIdx = -1;
    if (targetWidget !== null && targetWidget !== undefined){
        for (var idx in parent.children){
            if (!parent.children.hasOwnProperty(idx)){
                continue;
            }
            var child = parent.children[idx];
            if (targetWidget === child){
                insertIdx = idx;
                break;
            }
        }
    }

    SFinProject.insertWidgetByIdx(widget, parent, insertIdx, before);
};

/**
 * 向父对象中插入widget，如果父对象为null或不提供，向project中插入。
 * @param widget
 * @param parent
 * @param idx
 * @param before
 */
SFinProject.insertWidgetByIdx = function (widget, parent, idx, before) {
    if (!widget){
        return;
    }

    if (idx === undefined || idx === -1){
        parent.children.push(widget);
    }
    else{
        idx = before ? idx : idx + 1;
        parent.children.splice(idx, 0, widget);
    }
};

/**
 * 从父对象中删除widget。
 * @param widget
 * @param parent
 */
SFinProject.removeWidget = function (widget, parent) {
    if (!widget){
        return;
    }

    var ary = parent.children;

    for (var idx in ary){
        if (!ary.hasOwnProperty(idx)){
            continue;
        }
        var child = ary[idx];
        if (child === widget){
            ary.splice(idx, 1);
            break;
        }
    }
};

SFinProject.getIndexInParent = function (widget, parent) {
    var ary = parent.children;

    var retIdx = -1;
    for (var idx in ary){
        if (!ary.hasOwnProperty(idx)){
            continue;
        }
        var child = ary[idx];
        if (child === widget){
            retIdx = idx;
            break;
        }
    }

    return retIdx;
};

SFinProject.toJson = function (project) {
    // var jsonStr = JSON.stringify(this);
    return angular.toJson(project); // 防止字符串中出现$$hashkey。
};

SFinProject.fromJson = function (jsonStr) {
    return JSON.parse(jsonStr);
};

SFinProject.newGroup = function (name, proj) {
    var id = EFinWidgetType.group + proj.nextId[EFinWidgetType.group];
    proj.nextId[EFinWidgetType.group] ++;

    return new SFinWidget(name, EFinWidgetType.group, id, null);
};

SFinProject.newPage = function (name, proj) {
    var id = EFinWidgetType.page + proj.nextId[EFinWidgetType.page];
    proj.nextId[EFinWidgetType.page] ++;

    return new SFinWidget(name, EFinWidgetType.page, id, null);
};

SFinProject.newWidget = function (name, proj, type, attr) {
    var id = type + proj.nextId[type];
    proj.nextId[type] ++;

    return new SFinWidget(name, type, id, attr);
};

SFinProject.findParent = function (widget, root) {
    var parent = null;
    for (var idx in root.children){
        if (!root.children.hasOwnProperty(idx)){
            continue;
        }
        var item = root.children[idx];
        if (item === widget){
            parent = root;
            break;
        }
        else{
            parent = SFinProject.findParent(widget, item);
            if (null != parent){
                break;
            }
        }
    }

    return parent;
};

SFinProject.getAllPages = function (root) {
    var pages = [];
    for (var page in root.children){
        if (!root.children.hasOwnProperty(page)){
            continue;
        }
        var item = root.children[page];
        if (item.type === EFinWidgetType.page){
            pages.push(item);
        }
        else if (item.type == EFinWidgetType.group){
            var subpages = SFinProject.getAllPages(item);
            pages = pages.concat(subpages);
        }
    }

    return pages;
};