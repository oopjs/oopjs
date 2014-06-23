/**
 * The OOP Router class
 * @constructor
 */
OOP.Router = function() {
    this.routes = [];
    this.defaultRoute = false;
    this.construct = function() {
        window.output('OOPJS Router initialized.');
    };
    this.addRoute = function(slug, method, isDefault) {
        $oop.debug('Route added: ' + slug);
        this.routes[slug] = method;
    };
    this.addRoutes = function(routes) {
        for(var k in routes) {
            this.addRoute(k, routes[k]);
        }
    };
    this.route = function(request) {
        if(typeof(this.routes[request]) !== "undefined") {
            $oop.debug('Route matched: ', request);
            this.routes[request]();
        } else {
            $oop.debug('Route not found: ' + request);
        }
        return false;
    };
    this.path = function() {
        var path = window.location.href.split('/'); var protocol = path[0]; var host = path[2];
        path = window.location.href.replace(protocol + '//' + host, '').replace($oop.config.baseURL.replace(protocol + '//' + host, ''), '');
        if(path.substr(0,1) !== '/') {
            path = '/' + path;
        }
        return path;
    };
};
$class('Router').via(OOP.Router);

/**
 * The OOP Model class
 * @constructor
 */
OOP.ModelReserved = ['construct','update','set','get','delete','save','_original'];
OOP.Model = function() {
    this.construct = function(data) {
        if(typeof(data) !== 'undefined') {
            this._original = data;
            this.update(data);
        }
    };
    this.update = function(data) {
        for(var k in data) {
            if(!$oop.contains(k, OOP.ModelReserved)) {
                this[k] = data[k];
            }
        }
    };
    this.set = function(prop, val) {
        if(typeof(prop) == 'object') { return this.update(prop); }
        if(!$oop.contains(prop, OOP.ModelReserved)) {
            this[prop] = val;
        }
        return this;
    };
    this.get = function(prop) {
        if(!$oop.contains(prop, OOP.ModelReserved)) {
            return this[prop] || false;
        }
        return false;
    };
};
$class('Model').via(OOP.Model);

/**
 * The OOP Controller class
 * @constructor
 */
OOP.Controller = function() {
    this.action = function(action) {
        if(typeof(this[action]) === 'function') {
            return this[action]();
        } else {
            $oop.debug('Error - Invalid action requested: "' + action + '" in ' + this._name);
        }
    };
};
$class('Controller').via(OOP.Controller);