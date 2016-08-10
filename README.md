PolymerExt
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Want to use polymer with CMD and webpack?

Want separate HTML, CSS, JS from a polymer component?

Want add a asynchronous observers and trigger only once when multiple properties changes?

Just use **PolymerExt**

**Simple and Effective**

[DEMO](http://yutingzhao.com/polymer-ext/test/test.html)

[DEMO SRC](https://github.com/yutingzhao1991/polymer-ext/blob/master/test/test.js)

Ext API
---

### template && stylesheet


PolymerExt Extended two options **template** and **stylesheet**, Recommend ues PolymerExt with [webpack](http://webpack.github.io/docs/) and [raw-loader](https://github.com/webpack/raw-loader).


```
var PolymerExt = require('polymer-ext')

var t = require('raw!./test.tmpl')
var s = require('raw!./test.css')

PolymerExt({
  is: 'card-panel',
  template: t,
  stylesheet: s, // stylesheet accept a array for multiple style.
  ... // other polymer options
})
```

### asyncObservers

asyncObservers declare format same as observers, but it will be trigger asynchronous and trigger only once when multiple properties changes.

```
var PolymerExt = require('polymer-ext')

PolymerExt({
  is: 'card-panel',
  asyncObservers: ['functionName(argA, argB)'],
  ... // other polymer options
})
```

### setConfig

For better setConfig, you can init your components only when your need use it.

By default, components will be auto init. But you can set it with `setConfig`

```js
var PolymerExt = require('polymer-ext')
PolymerExt.setConifg({
  autoInit: false
})

var ChildrenComponent = PolymerExt({ /* ... */ })

var t = require('raw!./test.tmpl')
var s = require('raw!./test.css')

var CardPanel = PolymerExt({
  is: 'card-panel',
  template: t,
  stylesheet: s, // stylesheet accept a array for multiple style.
  components: [ChildrenComponent] // components's methods 'init' will be called before this component inited.
  ... // other polymer options
})

// ...

CardPanel.init()


License
---

[![License][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/polymer-ext.svg?style=flat-square
[npm-url]: https://npmjs.org/package/polymer-ext
[downloads-image]: http://img.shields.io/npm/dm/polymer-ext.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/polymer-ext
[license-image]: http://img.shields.io/npm/l/polymer-ext.svg?style=flat-square
[license-url]: #
