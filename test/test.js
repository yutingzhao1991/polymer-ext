'use strict';

var t = '<div class="header">\
      <content select="header"></content>\
    </div>\
    <div class="box" id="cardPanelBox">\
      <content select="*"></content>\
    </div>'

var s =   ':host {\
    display: block;\
    color: #666;\
    position: relative;\
  }\
  .header {\
    background-color: #fff;\
    border-radius: 2px;\
    border-color: #e4e5e7;\
    border: 1px solid #e4e5e7;\
    min-height: 40px;\
    line-height: 40px;\
    font-weight: bold;\
    position: relative;\
    padding: 0 50px 0 10px;\
    z-index: 3;\
    color: red;\
  }\
  .box {\
    border-radius: 2px;\
    background-color: #fff;\
    overflow: hidden;\
    border-color: #e4e5e7;\
    border: 1px solid #e4e5e7;\
    border-top: 0px;\
  }'

PolymerExt({
  is: 'card-panel',
  template: t,
  style: s,
  properties: {
    padding: {
      type: Number
    }
  },
  ready: function() {
    if (this.padding === 0) {
      // 只要有padding属性那么就默认是10
      // 如果需要padding为0那么就移除padding属性，那么这里得到的padding是undefined
      this.padding = 10
    }
    if (this.padding) {
      this.$.cardPanelBox.style.padding = this.padding + 'px'
    }
  }
})