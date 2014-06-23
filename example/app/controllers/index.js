$class('IndexController').extends('Controller').via(function() {
    this.index = function() {
        window.output('Index action detected (app/controllers/index.js)');
    };
});