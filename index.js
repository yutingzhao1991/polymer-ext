(function() {
  'use strict';
  // Extension for Polymer.
  // PolymerExt accept two others option template and stylesheet.
  var PolymerExt = function(options) {
    if (!options || (!options.template && !options.stylesheet)) {
      return
    }
    handlerAsyncObservers(options)
    var html = ['<dom-module id="', options.is,
      '"><style type="text/css">', options.stylesheet || '',
      '</style><template>', options.template || '',
      '</template></dom-module>'].join('')
    if (document.readyState === 'complete') {
      var ele = document.createElement('div')
      ele.style.display = 'none'
      ele.innerHTML = html
      document.body.appendChild(ele)
    } else {
      document.write(html)
    }
    if (window.Polymer) {
      return Polymer.apply(this, arguments)
    } else {
      var args = arguments
      var that = this
      window.addEventListener('WebComponentsReady', function(e) {
        Polymer.apply(that, args)
      })
      return null
    }
  }

  function handlerAsyncObservers(options) {
    if (!options.asyncObservers) {
      return
    }
    options.observers = options.observers || []
    for (var i = 0, sig; i < options.asyncObservers.length; i++) {
      sig = parseMethod(options.asyncObservers[i])
      if (sig) {
        addAsyncObserver(options, sig)
      }
    }
  }

  function addAsyncObserver(options, sig) {
    if (!options[sig.method]) {
      console.error('not find method:', sig.method)
      return
    }
    // method() => _async_method()
    var handlerMethod = '_async_' + sig.method
    options.observers.push(handlerMethod + '(' + sig.args.join(',') + ')')
    options[handlerMethod] = generateHandlerMethod(options[sig.method], handlerMethod)
  }

  function generateHandlerMethod(func, methodName) {
    func.__excuteFlag = 0
    return function() {
      var that = this
      var args = arguments
      func.__excuteFlag ++
      // async is a util method of polymer
      this.async(function() {
        func.__excuteFlag --
        if (func.__excuteFlag == 0) {
          // Only trigger the last one
          func.apply(that, args)
        }
      })
    }
  }

  // method expressions are of the form: `name([arg1, arg2, .... argn])`
  function parseMethod(expression) {
    // tries to match valid javascript property names
    var m = expression.match(/([^\s]+)\((.*)\)/)
    if (m) {
      var sig = { method: m[1] }
      if (m[2].trim()) {
        // replace escaped commas with comma entity, split on un-escaped commas
        var args = m[2].replace(/\\,/g, '&comma;').split(',')
        sig.args = args
      } else {
        sig.args = []
      }
      return sig
    }
    return null
  }

  // for AMD, CMD or browser global var, copy from underscore.
  var root = typeof self == 'object' && self.self === self && self ||
      typeof global == 'object' && global.global === global && global ||
      this;
  if (typeof exports != 'undefined') {
    if (typeof module != 'undefined' && module.exports) {
      exports = module.exports = PolymerExt;
    }
    exports.PolymerExt = PolymerExt;
  } else {
    root.PolymerExt = PolymerExt;
  }
  if (typeof define == 'function' && define.amd) {
    define('PolymerExt', [], function() {
      return PolymerExt;
    });
  }
}());
