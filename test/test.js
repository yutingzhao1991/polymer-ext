'use strict';

var t = require('raw!./test.tmpl')
var s = require('raw!./test.css')
var PolymerExt = require('..')

PolymerExt({
  is: 'card-panel',
  template: t,
  stylesheet: s,
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