/**
 * The OOP Router class
 * @constructor
 */
OOP.Router = function () {
    this.routes = [];
    this.defaultRoute = false;
    this.construct = function () {
        $oop.debug('OOPJS Router initialized.');
    };
    /**
     * Add a single route to the router
     * @param slug
     * @param method
     * @param isDefault
     */
    this.addRoute = function (slug, method, isDefault) {
        this.routes[slug] = method;
    };
    /**
     * Add an  array of routes to the router
     * @param routes
     */
    this.addRoutes = function (routes) {
        for (var k in routes) if (routes.hasOwnProperty(k)) {
            this.addRoute(k, routes[k]);
        }
    };
    /**
     * Route the current url request and execute any registered ready functions
     * @param request
     * @returns {*}
     */
    this.route = function (request) {
        if(request.indexOf('#') != -1) {
            request = (request.split('#'))[0];
        }
        var routePattern;
        var route;
        var rMatch = this.routes[request];
        // We have a raw url match, this will be easy
        if (typeof(rMatch) !== "undefined") {
            $oop.debug('Route matched: ', request, typeof(rMatch));
            // Sanitize & return
            if (typeof(rMatch) == 'function') {
                return rMatch();
            } else if (typeof(rMatch) == 'string') {
                return eval(rMatch + '()');
            }
        } else {
            // Let's search for a sprintf match
            var matched = false;
            var matchedLength = 0;
            // Iterate and "regex" match
            for (var x in this.routes) {
                if (this.routes.hasOwnProperty(x) && x.indexOf("%s") != -1) {
                    route = this.routes[x];
                    // Convert sprintf pattern to slug regex
                    routePattern = x.replace('%s', '([a-zA-Z0-9_-]+)');
                    routePattern = new RegExp(routePattern, 'gi');

                    // Search for regex matches
                    var matches = routePattern.exec(window.location.href);
                    if (matches && matches.length) {
                        matchedLength = routePattern.length;
                        // Sanitize
                        if (typeof(route) == 'function') {
                            return route(matches);
                        } else if (typeof(route) == 'string') {
                            return eval('route(matches)');
                        }
                    }
                }
            }

            // We were unable to find a match, do nothing.
            $oop.debug('Route not found: ' + request);
            return;
        }
        return false;
    };
    /**
     * Sanitize the path for use by the router
     * @returns {string[]}
     */
    this.path = function () {
        var path = window.location.href.split('/');
        var protocol = path[0];
        var host = path[2];
        path = window.location.href.replace(protocol + '//' + host, '').replace($oop.config.baseURL.replace(protocol + '//' + host, ''), '');
        if (path.substr(0, 1) !== '/') {
            path = '/' + path;
        }
        if (path.indexOf('?')) {
            var path = path.split('?');
            path = path[0];
        }
        return path;
    };
};
$class('Router').via(OOP.Router);

/**
 * The OOP Model class
 * @constructor
 */
OOP.ModelReserved = ['construct', 'update', 'set', 'get', 'delete', 'save', '_original'];
OOP.Model = function () {
    this.construct = function (data) {
        if (typeof(data) !== 'undefined') {
            this._original = data;
            this.update(data);
        }
    };
    this.update = function (data) {
        for (var k in data) {
            if (!$oop.contains(k, OOP.ModelReserved)) {
                this[k] = data[k];
            }
        }
    };
    this.set = function (prop, val) {
        if (typeof(prop) == 'object') {
            return this.update(prop);
        }
        if (!$oop.contains(prop, OOP.ModelReserved)) {
            this[prop] = val;
        }
        return this;
    };
    this.get = function (prop) {
        if (!$oop.contains(prop, OOP.ModelReserved)) {
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
OOP.Controller = function () {
    this.action = function (action) {
        if (typeof(this[action]) === 'function') {
            return this[action]();
        } else {
            $oop.debug('Error - Invalid action requested: "' + action + '" in ' + this._name);
        }
    };
};
$class('Controller').via(OOP.Controller);