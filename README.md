PolymerExt
===

Want to use polymer with CMD and webpack?

Want separate HTML, CSS, JS from a polymer component?

Just use **PolymerExt**

**Simple and Effective**

[DEMO](http://yutingzhao.com/polymer-ext/test/test.html)

[DEMO SRC](https://github.com/yutingzhao1991/polymer-ext/blob/master/test/test.js)

Usage
---

PolymerExt Extended two options **template** and **style**, Recommend ues PolymerExt with [webpack](http://webpack.github.io/docs/) and [raw-loader](https://github.com/webpack/raw-loader).


```
var PolymerExt = require('polymer-ext')

var t = require('raw!./test.tmpl')
var s = require('raw!./test.css')

PolymerExt({
  is: 'card-panel',
  template: t,
  style: s,
  ... // other polymer options
})
```
