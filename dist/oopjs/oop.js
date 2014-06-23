/*! oop.js - http://oopjs.com/ - Written by Andrew Ewing - http://github.com/aewing - 2014-06-23 */
var OOP=function(){this.config={debug:!1,debugLevel:1,baseURL:"/"},this.debug=function(){if($oop.config.debug)try{console.log("[OOPJS]",arguments)}catch(a){}},this.new=function(a){var b=$oop.getClass(a),c=new OOP.Object;if(b._extends){var d=$oop.getClass(b._extends);c=$oop._extend(c,d._userland),c._extends=b._extends}return c=$oop._extend(c,b._userland),function(a){return function(){return"undefined"!=typeof a.construct&&a.construct.apply(a,arguments),a}}(c)},this._classRegistry={},this.getClass=function(a){var b=this._classRegistry[a];if("undefined"==typeof b)throw'Class "'+a+'" is undefined';return b},this.ready=function(a){if($oop._onReady.push(a),$oop._ready){for(var b in $oop._onReady)$oop._onReady[b]();$oop._onReady=[]}},this.contains=function(a,b){for(var c in b)if(b[c]===a)return!0;return!1},this.clone=function(a){var b;if("function"==typeof a){b=function(){};var c=new a;for(var d in c)b[d]=c[d];for(var e in c.prototype)b[e]=c[e]}else if(b={},"object"==typeof a)for(var f in a)b[f]=a[f];return b},this.onHook=function(a,b){if("undefined"==typeof $oop._hooks[a]&&($oop._hooks[a]=[]),"function"!=typeof b)throw"Hook method must be a function";$oop._hooks[a].push(b)},this.hook=function(a,b){if("object"==typeof $oop._hooks[a])for(var c in $oop._hooks[a]){var d=$oop._hooks[a][c];if("function"==typeof d){var e=d(b);"undefined"!=typeof e&&e.length>0&&(b=e)}}return b},this._extend=function(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];for(var f in a.prototype)c[f]=a.prototype[f];for(var g in b.prototype)c[g]=b.prototype[g];return c},this._ready=!1,this._onReady=[],this._hooks={}};OOP.Class=function(a){return this._name=a||"OOP.Class",this._extends=null,this._userland={},$oop._classRegistry[a]=this,this},OOP.Class.prototype.extends=function(a){return this._extends=a,this},OOP.Class.prototype.via=function(a){this._userland={};var b=new a;for(var c in b)this._userland[c]=b[c];for(var d in b.prototype)this._userland[d]=b.prototype[d];return this},OOP.Object=function(){this._name="OOP.Object",this._extends=null},OOP.Object.prototype.getParent=function(){return $oop.getClass(this._extends)._userland||!1},OOP.Object.prototype.instanceOf=function(a){return a===this._extends};var $class=function(a){return new OOP.Class(a)},$oop=window.$oop=new OOP,$new=$oop.new;window.onload=function(){$oop._ready=!0,$oop.debug("Window is ready, processing ready callbacks"),$oop.ready(function(){$oop.debug("OOP is ready")})};