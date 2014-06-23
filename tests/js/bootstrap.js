$class('Foo').via(function() {
    this.a = false;
    this.b = false;
    this.type = 'foo';
    this.ancestor = 'fu';
    this.construct = function(a, b) {
        this.a = a;
        this.b = b;
    };
});

$class('Bar').extends('Foo').via(function() {
    this.type = 'bar';
    this.baz = function() { return true; }
});