/**
 * Created by myf on 16/5/31.
 */

function Action(name){
    this.name = name;
    this.time = new Date().getTime();
}

{
    Action.prototype.do = function(isRedo){
    };

    Action.prototype.undo = function(){
    };
}

function ValueAction(name, obj, field, oldValue, newValue, scope){
    Action.call(this, name);

    this.obj = obj;
    this.field = field;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.scope = scope;
}
ValueAction.prototype=new Action();
ValueAction.prototype.constructor=ValueAction;

ValueAction.prototype.do = function(isRedo){
    this.obj[this.field] = this.newValue;
    this.obj.undo = false;
    this.obj.redo = false;
    if (isRedo){
        this.obj.redo = true;
        this.scope.$apply();
    }
};

ValueAction.prototype.undo = function(){
    this.obj[this.field] = this.oldValue;
    this.obj.undo = true;
    this.obj.redo = false;
    this.scope.$apply();
};

function ActionManager() {
    this.redoList = [];
    this.undoList = [];
}

{
    ActionManager.prototype.addAction = function (action) {
        // 如果action的名称与前一个action的名称相同，且此次调用时间与上次调用时间不超过0.2秒钟，则认为与上个action为同一个action。
        if (action instanceof ValueAction){
            if (this.undoList.length > 0){
                var lastAction = this.undoList[this.undoList.length-1];
                if (lastAction.name != null && lastAction.name == action.name &&
                    action.obj === lastAction.obj &&
                    action.field === lastAction.field &&
                    action.time - lastAction.time<200
                ){
                    action.oldValue = lastAction.oldValue;
                    this.undoList.pop();
                }
            }
        }
        this.undoList.push(action);
        this.redoList.length = 0;
        action.do();
        console.log("undolist: " + this.undoList.length);
    };

    ActionManager.prototype.undo = function () {
        if (this.undoList.length == 0){
            return;
        }

        var action = this.undoList.pop();
        this.redoList.push(action);
        action.undo();
    };

    ActionManager.prototype.redo = function () {
        if (this.redoList.length == 0){
            return;
        }

        var action = this.redoList.pop();
        this.undoList.push(action);
        action.do(true);
    };

    ActionManager.prototype.canUndo = function () {
        return this.undoList.length > 0;
    };

    ActionManager.prototype.canRedo = function () {
        return this.redoList.length > 0;
    };
}

var g_result = 0;
function MathAction(name, add){
    this.name = name;
    this.add = parseInt(add);
}

MathAction.prototype.do = function(){
    g_result += this.add;
};

MathAction.prototype.undo = function(){
    g_result -= this.add;
};


