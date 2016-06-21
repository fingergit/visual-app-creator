/**
 * Created by laj on 2016/6/15.
 */

var EFinThemeColor = {
    light: {name: 'light', value: 'light'}
    ,stable: {name: 'stable', value: 'stable'}
    ,positive: {name: 'positive', value: 'positive'}
    ,calm: {name: 'calm', value: 'calm'}
    ,balanced: {name: 'balanced', value: 'balanced'}
    ,energized: {name: 'energized', value: 'energized'}
    ,assertive: {name: 'assertive', value: 'assertive'}
    ,royal: {name: 'royal', value: 'royal'}
    ,dark: {name: 'dark', value: 'dark'}
};

var EFinHeaderTitleAlign = {
    left: {name: 'left', value: 'left'}
    ,center: {name: 'center', value: 'center'}
    ,right: {name: 'right', value: 'right'}
};

function SFinHeaderAttr() {
    this.title = EFinHeaderAttrDesc.title.default;
    this.theme = EFinHeaderAttrDesc.theme.default;
    this.titleAlign = EFinHeaderAttrDesc.titleAlign.default;
    this.noTapScroll = EFinHeaderAttrDesc.noTapScroll.default;
    this.desc = EFinHeaderAttrDesc;
}
SFinHeaderAttr.newInstance = function () {
    return new SFinHeaderAttr();
};

var EFinAttrType = {
    string: 'string'
    ,enumCombox: 'enumCombox'
    ,enumButton: 'enumButton'
    ,boolSwitch: 'boolSwitch'
};

var EFinHeaderAttrDesc = {
    title: {name: 'title', type: EFinAttrType.string, default: 'title'}
    ,theme: {name: 'theme', type: EFinAttrType.enumCombox, default: EFinThemeColor.light, range: EFinThemeColor}
    ,titleAlign: {name: 'titleAlign', type: EFinAttrType.enumButton, default: EFinHeaderTitleAlign.center}
    ,noTapScroll: {name: 'noTapScroll', type: EFinAttrType.boolSwitch, default: true}
};

