(function() {
    'use strict';
    // Extension for Polymer.
    // PolymerExt accept two others option template and stylesheet.
    var PolymerExt = function(options) {
        if (!options || (!options.template && !options.stylesheet)) {
            return
        }
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
        return Polymer.apply(this, arguments)
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
