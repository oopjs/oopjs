/**
 * HTTP Request object for OOPJS
 * @constructor
 */
OOP.HTTPRequest = function() {
    this.options = {method:'GET',url:'/',async:true,user:undefined,password:undefined,cache:false};
    this.response = null;
    /**
     * Open the HTTP Request
     * @param options
     */
    this.open = function(options) {
        this.options = OOP.extract(this.options, options);
        // Clean URL
        if(this.options.url.indexOf('//') === -1) {
            var path = window.location.href.split('/');
            var protocol = path[0];
            var host = path[2];
            this.options.url = protocol + '//' + host + this.options.url;
        }
        // Check cache, if allowed
        if(this.options.cache && typeof(Storage) !== 'undefined') {
            var cached = localStorage.getItem(this.options.url);
            if(cached) {
                if(this.options.json) cached = JSON.parse(cached);
                if(typeof(this.options.success) == 'function') {
                    this.options.success(cached, {cached:true});
                } else if(typeof(this.options.response) == 'function') {
                    this.options.response(cached, {cached:true});
                }
                return this;
            }
        }
        // Continue with request
        this.xhr = new XMLHttpRequest();
        try {
            this.xhr.open(this.options.method, this.options.url, this.options.async, this.options.user, this.options.password);
            this.xhr.onreadystatechange = (function(request) {
                return function(e) {
                    request.stateChange(e, this);
                };
            })(this);
            this.xhr.send();
        } catch(e) {}
        return this;
    };
    /**
     * Called every time the request state changes
     * @param e
     * @param response
     */
    this.stateChange = function(e, response) {
        if($oop.config.debugLevel > 1 || response.readyState === 4) {
            $oop.Debug('[Request:' + this.options.url + '] State change: ' + response.readyState);
        }
        this.state = response.readyState;
        if(this.state === 4) {
            this.response = response;
            this.responseData = response.responseText;
            if(response.status == 200 && this.options.cache && typeof(Storage) !== "undefined") {
                localStorage.setItem(this.options.url, this.responseData);
            }
            if(response.status == 200 && this.options.json) { this.responseData = JSON.parse(this.responseData); }
            if(response.status === 200 && typeof(this.options.success) === 'function') { this.options.success(this.responseData, response); }
            else if(response.status !== 200 && typeof(this.options.failure) === 'function') { this.options.failure(response); }
            else if(typeof(this.options.response) === 'function') { this.options.response(this.responseData, response); }
        }
    };
    /**
     * Used to filter the response text
     * @param result
     * @returns {string}
     */
    this.filter = function(result) {
        return result.responseText;
    };
};

$class('HTTPRequest').via(OOP.HTTPRequest);