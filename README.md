PolymerExt
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Want to use polymer with CMD and webpack?

Want separate HTML, CSS, JS from a polymer component?

Just use **PolymerExt**

**Simple and Effective**

[DEMO](http://yutingzhao.com/polymer-ext/test/test.html)

[DEMO SRC](https://github.com/yutingzhao1991/polymer-ext/blob/master/test/test.js)

Usage
---

PolymerExt Extended two options **template** and **stylesheet**, Recommend ues PolymerExt with [webpack](http://webpack.github.io/docs/) and [raw-loader](https://github.com/webpack/raw-loader).


```
var PolymerExt = require('polymer-ext')

var t = require('raw!./test.tmpl')
var s = require('raw!./test.css')

PolymerExt({
  is: 'card-panel',
  template: t,
  stylesheet: s,
  ... // other polymer options
})
```

License
---

[![License][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/polymer-ext.svg?style=flat-square
[npm-url]: https://npmjs.org/package/polymer-ext
[downloads-image]: http://img.shields.io/npm/dm/polymer-ext.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/polymer-ext
[license-image]: http://img.shields.io/npm/l/polymer-ext.svg?style=flat-square
[license-url]: #
