function AddWidgetAction(scope, name, widget, parent, targetWidget, before){
    Action.call(this, name);
    this.scope = scope;
    this.widget = widget;
    this.parent = parent;
    this.targetWidget = targetWidget;
    this.before = before;
}
AddWidgetAction.prototype=new Action();
AddWidgetAction.prototype.constructor=AddWidgetAction;

AddWidgetAction.prototype.do = function(isRedo){
    SFinProject.insertElemByRefElem(this.widget, this.parent, this.targetWidget, this.before);
    this.scope.selectedElem = this.widget;
    if (isRedo){
        this.scope.safeApply();
    }

    if (!$.inArray(this.parent, this.scope.expandedNodes)){
        this.scope.expandedNodes.push(this.parent);
    }
};

AddWidgetAction.prototype.undo = function(){
    SFinProject.removeElem(this.widget, this.parent);
    this.scope.selectedElem = null;
    this.scope.safeApply();
};
