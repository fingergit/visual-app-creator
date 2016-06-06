/*
 * Copyright (c) 2016 Joytoyboy
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 对窗口中的相邻窗口之间进行拖拽，以改变窗口的大小。本文件依整于jquery库。
 * 通过调整left、right、top、bottom属性来调整panel大小。这些属性是按百分比设置的，这样，即使改变窗口大小，它们的比例仍然保持。
 * 使用方法：
 * AB是两个panel、A表示左侧或上侧，B表示右侧或下侧。在A中包裹splitter，splitter要有名为`splitter`的class。
 * AB的position均为absolute。
 * 拖拽时，A的宽度减小或变大，如果B设置了right，只将B的left改变，宽度自动。如果B未设置right，修改B的宽度。
 * 面板的位置信息保存在localStorage中，在初始化时读取，每次拖拽后保存。
 */
//
// $(function () {
//     var splitter = new FinSplitter();
//     splitter.init();
// });

/**
 * 定义splitter一侧的面板。
 * @param $dom jQuery dom元素。
 * @constructor
 */
function SplitPanel($dom) {
    this.$dom = $dom;       // 面板DOM元素。
    this.rc = null;         // 面板位置。
    this.$maskDom = null;   // 蒙板DOM。在拖拽开始后为此面创建一个透明蒙板，覆盖在面板上面。用于解决如果面板中有iframe，光标移到iframe后，无法拖拽splitter。
    this.minWidth = 0;      // 面板最小宽度。
    this.minHeight = 0;     // 面板最小高度。
    this.maxWidth = 0;      // 面板最大宽度。
    this.maxHeight = 0;     // 面板最大高度。
}

/**
 * 清空面板数据。拖拽结束后执行此操作。
 */
SplitPanel.prototype.clear = function () {
    if (null !== this.$dom){
        var selectNone = ["-webkit-user-select", "-moz-user-select", "-ms-user-select", "user-select"];
        var that = this;
        $.each(selectNone, function (index, value) {
            that.$dom.css(value, "text");
        });
    }
    this.$dom = null;
    this.rc = null;
    if (this.$maskDom){
        this.$maskDom.remove();
    }
    this.$maskDom = null;
};

/**
 * 面板分割操作。
 * @constructor
 */
function FinSplitter() {
    this.$splitters = null;     // 页面中的splitter DOM。

    // this.$curSplitter = null;
    this.running = false;       // 是否正在拖拽。
    this.ptStart = null;        // 拖拽起始位置。
    this.isHorz = false;        // splitter是水平分割还是垂直分割条。

    this.pannels = null;        // splitter两侧的面板。
    this.containerRect = null;  // 容纳两个面板的父DOM的位置。
    this.oldCursor = null;      // 拖拽前的鼠标形状态。拖拽开始后，如果光标或快或慢离开splitter后，光标会变成箭头，这里在开始后强制变为size光标，结束后改回来。
}

/**
 * 对象FinSplitter中的函数。
 */
{
    /**
     * 初始化splitter对象。
     */
    FinSplitter.prototype.init = function () {
        this.$splitters = $(".splitter");
        console.log(this.$splitters);

        // 读取保存的位置信息，设置给相应的面板。
        this.load();

        var $body = $("body");
        this.oldCursor = $body.css("cursor"); // 保存原始cursor。
        $.each(this.$splitters, function (index, splitter) {
            console.log(splitter);

            $(splitter).css("cursor", $(splitter).width() < $(splitter).height() ? "ew-resize":"ns-resize");
        });

        var that = this;
        this.$splitters.on("mousedown touchstart", function(e){
            that.start(e);
            return true;
        });

        $body.on("mousemove touchmove", function(e){
            that.move(e);
        });

        $body.on("mouseup touchend", function(){that.end();});
    };

    FinSplitter.prototype.start = function (event) {
        this.clear();
        var that = this;

        // 拖拽起始位置
        this.ptStart = {x: event.clientX, y: event.clientY};

        // 当前拖拽的splitter
        var $splitter = $(event.target);
        // this.$curSplitter = $(this);

        this.isHorz = $splitter.width() < $splitter.height();
        $("body").css("cursor", this.isHorz ? "ew-resize":"ns-resize");

        var $plitterParent = $splitter.parent();
        this.pannels = [new SplitPanel($plitterParent),
            new SplitPanel($plitterParent.next())];
        if (null == this.pannels[0].$dom || null == this.pannels[1].$dom){
            return;
        }

        var $parent = this.pannels[0].$dom.parent();
        this.containerRect = {l: $parent.position().left,
            t: $parent.position().top,
            w: $parent.width(),
            h: $parent.height()};

        var selectNone = ["-webkit-user-select", "-moz-user-select", "-ms-user-select", "user-select"];
        $.each(this.pannels, function (index, panel) {
            var $dom = panel.$dom;
            panel.rc = {
                l: getCssValue($dom, "left"),
                t: getCssValue($dom, "top"),
                r: getCssValue($dom, "right"),
                b: getCssValue($dom, "bottom")
            };

            var $maskDom = $("<div></div>");
            $maskDom.css("position", "absolute");
            $maskDom.css("background", "#b6c2c9");
            $maskDom.css("opacity", "0");
            $maskDom.css("z-index", "100");
            $maskDom.css("float", "left");

            if (that.isHorz){
                $maskDom.css("left", "0px");
                $maskDom.css("right", "0px");
                $maskDom.css("height", "100%");
            }
            else{
                $maskDom.css("top", "0px");
                $maskDom.css("bottom", "0px");
                $maskDom.css("width", "100%");
            }
            $maskDom.appendTo($dom);
            panel.$maskDom = $maskDom;

            // panel.minWidth = $dom.minWidth();
            // panel.minHeight = $dom.minHeight();
            // panel.maxWidth = $dom.maxWidth();
            // panel.maxHeight = $dom.maxHeight();

            $.each(selectNone, function (index, value) {
                $dom.css(value, "none");
            });

        });

        // 开始拖拽
        console.log("splitting start");
        this.running = true;

        return false;
    };

    FinSplitter.prototype.move = function (event) {
        if (!this.running){
            return;
        }

        // var offset = this.isHorz ? (event.clientX - this.ptStart.x) : (event.clientY - this.ptStart.y);
        var ratio = this.isHorz ? (event.clientX - this.containerRect.l)/this.containerRect.w * 100:
        (event.clientY - this.containerRect.t)/this.containerRect.h * 100;
        var ratioA = 100 - ratio;

        this.pannels[0].$dom.css(this.isHorz?"right":"bottom", ratioA + "%");
        this.pannels[1].$dom.css(this.isHorz?"left":"top", ratio + "%");

        this.pannels[0].$dom.css(this.isHorz?"width":"height", 'auto');
        this.pannels[1].$dom.css(this.isHorz?"width":"height", 'auto');
    };

    FinSplitter.prototype.end = function () {
        if (this.running){
            this.save();
        }
        this.clear();
    };

    /**
     * 进行拖拽结束后的清理工作。
     */
    FinSplitter.prototype.clear = function () {
        this.running = false;

        $.each(this.pannels, function (index, panel) {
            panel.clear();
        });

        $("body").css("cursor", this.oldCursor);

        this.pannels = null;
        this.containerRect = null;
    };

    /**
     * 从本地读取splitter数据。
     */
    FinSplitter.prototype.load = function () {
        var panelLayout = localStorage.panelLayout;
        if (!panelLayout){
            return;
        }

        var panelPos = JSON.parse(panelLayout);
        var panels = [];

        $.each(this.$splitters, function (index, splitter) {
            var $plitterParent = $(splitter).parent();
            panels.push($plitterParent);
            panels.push($plitterParent.next());
        });

        if (panelPos.length != panels.length){
            return;
        }

        $.each(panels, function (index, $panel) {
            if (panelPos[index].horz){
                $panel.css("left", panelPos[index].l + "%");
                $panel.css("right", panelPos[index].r + "%");
                $panel.css("width", "auto");
            }
            else{
                $panel.css("top", panelPos[index].t + "%");
                $panel.css("bottom", panelPos[index].b + "%");
                $panel.css("height", "auto");
            }
        });

        console.log("rc: " + panelPos);
    };

    /** 保存splitter数据到本地。*/
    FinSplitter.prototype.save = function(){
        // 有些panel会重复保存，还有优化的空间。
        var panelPos = [];
        $.each(this.$splitters, function (index, splitter) {
            var $plitterParent = $(splitter).parent();
            var isHorz = $(splitter).width() < $(splitter).height();
            var pannels = [$plitterParent,
                $plitterParent.next()];


            var $parent = $plitterParent.parent();
            var containerSize = {l: $parent.position().left,
                t: $parent.position().top,
                w: $parent.width(),
                h: $parent.height()};

            $.each(pannels, function (index, $panel) {
                var rc = {
                    horz: isHorz,
                    l: (getCssValue($panel, "left") - containerSize.l) * 100 / containerSize.w,
                    t: (getCssValue($panel, "top") - containerSize.t) * 100 / containerSize.h,
                    r: (getCssValue($panel, "right") - containerSize.l) * 100 / containerSize.w,
                    b: (getCssValue($panel, "bottom") - containerSize.t) * 100 / containerSize.h
                };
                panelPos.push(rc);
            });
        });

        localStorage.panelLayout = JSON.stringify(panelPos);
    };
}

/**
 * 获取DOM的css属性数值。（只取数值部分）
 * @param $dom
 * @param attr
 * @returns {*}
 */
function getCssValue($dom, attr){
    var value = $dom.css(attr);
    try{
        value = parseFloat(value);
    }
    catch(e){
        console.log(e.message);
        value = 0;
    }

    return value;
}
