/**
 * Created by laj on 2016/6/20.
 */
function DelWidgetAction(scope, name, widget, parent){
    Action.call(this, name);
    this.scope = scope;
    this.widget = widget;
    this.parent = parent;
    this.idx = SFinProject.getIndexInParent(widget, parent);
    this.before = true;
}
DelWidgetAction.prototype=new Action();
DelWidgetAction.prototype.constructor=DelWidgetAction;

DelWidgetAction.prototype.do = function(isRedo){
    SFinProject.removeElem(this.widget, this.parent);
    this.scope.selectedElem = null;
    if (isRedo){
        this.scope.safeApply();
    }
};

DelWidgetAction.prototype.undo = function(){
    SFinProject.insertElemByRefElem(this.widget, this.parent, this.targetWidget, this.before);
    this.scope.selectedElem = this.widget;
    this.scope.safeApply();
};

