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

	var t = __webpack_require__(1)
	var s = __webpack_require__(2)
	var PolymerExt = __webpack_require__(3)

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "<div class=\"header\">\n  <content select=\"header\"></content>\n</div>\n<div class=\"box\" id=\"cardPanelBox\">\n  <content select=\"*\"></content>\n</div>"

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ":host {\n    display: block;\n    color: #666;\n    position: relative;\n}\n.header {\n    background-color: #fff;\n    border-radius: 2px;\n    border-color: #e4e5e7;\n    border: 1px solid #e4e5e7;\n    min-height: 40px;\n    line-height: 40px;\n    font-weight: bold;\n    position: relative;\n    padding: 0 50px 0 10px;\n    z-index: 3;\n    color: red;\n}\n.box {\n    border-radius: 2px;\n    background-color: #fff;\n    overflow: hidden;\n    border-color: #e4e5e7;\n    border: 1px solid #e4e5e7;\n    border-top: 0px;\n}"

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {(function() {
	    'use strict';
	    // Extension for Polymer.
	    // PolymerExt accept two others option template and style.
	    var PolymerExt = function(options) {
	        if (!options || (!options.template && !options.style)) {
	            return
	        }
	        var html = ['<dom-module id="', options.is,
	            '"><style type="text/css">', options.style || '',
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
	        Polymer.apply(this, arguments)
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

/***/ }
/******/ ]);