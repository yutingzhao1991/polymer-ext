/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PolymerExt = __webpack_require__(1)

	var t = __webpack_require__(2)
	var s = __webpack_require__(3)
	var btnStyle = __webpack_require__(4)

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {(function() {
	  'use strict';
	  // Extension for Polymer.
	  // PolymerExt accept two others option template and stylesheet.
	  var globalConfig = {
	    autoInit: true
	  }
	  var PolymerExt = function(options) {
	    if (!options || (!options.template && !options.stylesheet)) {
	      return
	    }
	    var retObj = {}
	    retObj.init = function() {
	      if (!options.__inited) {
	        if (options.components) {
	          for (var c in options.components) {
	            options.components[c].init()
	          }
	        }
	        initComponent(options)
	      }
	      options.__inited = true
	    }
	    if (globalConfig.autoInit || options.autoInit) {
	      retObj.init()
	    }
	    return retObj
	  }
	  PolymerExt.setConfig = function(config) {
	    if (config.autoInit != null) {
	      globalConfig.autoInit = config.autoInit
	    }
	  }

	  function initComponent(options) {
	    var styleStr = ''
	    if (typeof options.stylesheet == 'string') {
	      styleStr = options.stylesheet
	    } else {
	      styleStr = options.stylesheet.join('\n')
	    }
	    handlerAsyncObservers(options)
	    var html = ['<dom-module id="', options.is,
	      '"><style type="text/css">', styleStr || '',
	      '</style><template>', options.template || '',
	      '</template></dom-module>'].join('')
	    if (document.readyState !== 'loading') {
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
	    func.__excuteInstances = []
	    return function() {
	      var isNewInstance = true
	      func.__excuteFlag ++
	      for (var i = 0; i < func.__excuteInstances.length; i++) {
	        if (func.__excuteInstances[i].instance === this) {
	          // already included.
	          isNewInstance = false
	          func.__excuteInstances[i].args = arguments
	          break
	        }
	      }
	      if (isNewInstance) {
	        func.__excuteInstances.push({
	          instance: this,
	          args: arguments
	        })
	      }
	      // async is a util method of polymer
	      this.async(function() {
	        func.__excuteFlag --
	        if (func.__excuteFlag == 0) {
	          // Trigger with all instances at the last one
	          var temp
	          while(func.__excuteInstances.length > 0) {
	            temp = func.__excuteInstances.shift()
	            func.apply(temp.instance, temp.args)
	          }
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
	  if (true) {
	    if (typeof module != 'undefined' && module.exports) {
	      exports = module.exports = PolymerExt;
	    }
	    exports.PolymerExt = PolymerExt;
	  } else {
	    root.PolymerExt = PolymerExt;
	  }
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return PolymerExt;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div class=\"header\">\n  <content select=\"header\"></content>\n</div>\n<div class=\"box\" id=\"cardPanelBox\">\n  <content select=\"*\"></content>\n  <p>\n    <div>{{a}}</div>\n    <div>{{b}}</div>\n    <button class=\"btn btn-default\" on-click=\"onAsyncTestClicked\">async test</button>\n    <div id=\"log\"></div>\n  </p>\n</div>"

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ":host {\n    display: block;\n    color: #666;\n    position: relative;\n}\n.header {\n    background-color: #fff;\n    border-radius: 2px;\n    border-color: #e4e5e7;\n    border: 1px solid #e4e5e7;\n    min-height: 40px;\n    line-height: 40px;\n    font-weight: bold;\n    position: relative;\n    padding: 0 50px 0 10px;\n    z-index: 3;\n    color: red;\n}\n.box {\n    border-radius: 2px;\n    background-color: #fff;\n    overflow: hidden;\n    border-color: #e4e5e7;\n    border: 1px solid #e4e5e7;\n    border-top: 0px;\n}"

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = ".btn {\n  display: inline-block;\n  margin: 5px 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.btn-default {\n  color: #333333;\n  background-color: #ffffff;\n  border-color: #cccccc;\n}"

/***/ }
/******/ ]);