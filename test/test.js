'use strict';

var PolymerExt = require('..')

var t = require('raw!./test.tmpl')
var s = require('raw!./test.css')
var btnStyle = require('raw!./btn.css')

PolymerExt({
  is: 'card-panel',
  template: t,
  stylesheet: [s, btnStyle],
  properties: {
    padding: {
      type: Number
    },
    a: {
      type: String,
      value: 'I am a'
    },
    b: {
      type: String,
      value: 'I am b'
    }
  },
  asyncObservers: ['asyncTest(a, b)'],
  asyncTest: function(a, b) {
    this.log('asyncObserver trigger: a or b changed')
  },
  log: function(text) {
    this.$.log.innerHTML += text + '<br>'
  },
  onAsyncTestClicked: function() {
    this.a = 'a changed'
    this.b = 'b changed'
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