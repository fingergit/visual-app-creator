/**
 * Created by laj on 2016/6/15.
 */

var EFinWidgetType = {
    group: 'group'
    ,page: 'page'
    ,button: 'button'
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
    this.parent = null;
    this.children = [];
}

function SFinTheme(){
}

function SFinProject(){
    this.theme = null;
    this.children = [];

    this.nextId = {};
    for (var idx in EFinWidgetType){
        this.nextId[EFinWidgetType[idx]] = 1;
    }
}

SFinProject.insertWidgetByWidget = function (widget, parent, targetWidget, before) {
    var insertIdx = -1;
    if (targetWidget !== null && targetWidget !== undefined){
        for (var idx in parent.children){
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

    widget.parent = parent;
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
 */
SFinProject.removeWidget = function (widget) {
    if (!widget){
        return;
    }

    var ary = [];
    if (widget.parent){
        ary = widget.parent.children;
    }
    else{
        return;
    }

    for (var idx in ary){
        var child = ary[idx];
        if (child === widget){
            child.parent = null;
            ary.splice(idx, 1);
            break;
        }
    }
};

SFinProject.getIndexInParent = function (widget) {
    if (widget.parent){
        ary = widget.parent.children;
    }
    else{
        return;
    }

    var retIdx = -1;
    for (var idx in ary){
        var child = ary[idx];
        if (child === widget){
            retIdx = idx;
            break;
        }
    }

    return retIdx;
};

SFinProject.prototype.toJson = function () {
    // 先将父对象属性去掉。
    this.addOrRemoveParent(null, true);
    // var jsonStr = JSON.stringify(this);
    var jsonStr = angular.toJson(this); // 防止字符串中出现$$hashkey。
    this.addOrRemoveParent(null, false);

    return jsonStr;
};

/**
 * 递归将所有widget的parent属性添加或去除。
 * @param parent 父widget，如果为null，则为project。
 * @param remove
 */
SFinProject.prototype.addOrRemoveParent = function (parent, remove) {
    if (!parent){
        parent = this;
    }

    for (var idx in parent.children){
        var child = parent.children[idx];
        if (remove){
            child.parent = null;
        }
        else{
            child.parent = parent;
        }

        this.addOrRemoveParent(child, remove);
    }
};

SFinProject.fromJson = function (jsonStr) {
    var project = JSON.parse(jsonStr);
    project.addOrRemoveParent(null, false);
    return project;
};

SFinProject.newGroup = function (name, proj) {
    var id = EFinWidgetType.group + proj.nextId[EFinWidgetType.group];
    proj.nextId[EFinWidgetType.group] ++;

    var group = new SFinWidget(name, EFinWidgetType.group, id, null);
    return group;
};

SFinProject.newPage = function (name, proj) {
    var id = EFinWidgetType.page + proj.nextId[EFinWidgetType.page];
    proj.nextId[EFinWidgetType.page] ++;

    var page = new SFinWidget(name, EFinWidgetType.page, id, null);
    return page;
};

SFinProject.newWidget = function (name, proj, type, attr) {
    var id = type + proj.nextId[type];
    proj.nextId[type] ++;

    var widget = new SFinWidget(name, type, id, attr);
    return widget;
};
