$class('Elem').via(function() {
    this._selector = null;
    this._dom = null;
    this._oop = true;
    this.construct = function(selector) {
        if(typeof(selector) == 'object') {
            if(typeof(selector._oop) !== 'undefined') {
                this.apply(selector);
                return this;
            } else {
                this._dom = [selector];
                this._selector = selector;
            }
        } else {
            this._selector = selector;
            this._dom = document.querySelectorAll(this._selector);
        }
        return this;
    };
    this.dom = function() {
        return this._dom;
    };
    this.each = function(callback) {
        for(var x in this._dom) {
            if(typeof(this._dom[x]) == 'object') {
                callback.apply($elem(this._dom[x]));
            }
        }
    };
    this.event = function(type, handler) {
        this.each(function() {
            var dom = this.dom()[0];
            var oopHandler = (function(el) { return function() { handler.apply(el); }; })(this);
            // Watch for change instead [hidden]
            /* if(type == 'change' && dom.tagName == 'INPUT' && dom.getAttribute('type') === 'hidden') {
                watch(dom, "value", oopHandler);
            } else */ if (dom.addEventListener) {
                dom.addEventListener(type, oopHandler, false);
            } else {
                dom.attachEvent('on' + type, oopHandler);
            }
        });
    };
    this.val = function(value) {
        if(typeof(value) !== 'undefined') {
            this.each(function() {
                this.value = value;
            });
            return this;
        }
        return this._dom[0].value;
    };
    this.attr = function(attr, value) {
        if(typeof(value) !== 'undefined') {
            for(var x in this._dom) {
                this._dom[x].setAttribute(attr, value);
            }
        } else {
            return this._dom[0].getAttribute(attr);
        }
    };
});
OOP._elemCache = {};

$elem = function(selector) {
    return $new('Elem')(selector);
};