$oop.config.baseURL = '/oopjs/example/';
$oop.ready(function() {
    var router = $new('Router')();
    window.appRoutes = {};

    // Register the index route
    window.appRoutes['/'] = function() {
        var controller = $new('IndexController')();
        return controller.action('index');
    };

    router.addRoutes(window.appRoutes);
    router.route(router.path());
});