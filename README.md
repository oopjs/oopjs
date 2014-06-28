# oop.js
[oop.js](http://www.oopjs.com) is a lightweight pseudo-object-oriented library for extendable and reusable objects in JavaScript.
This software is released as-is under an MIT license, and offered with no guarantees, implied or otherwise.
You may copy, modify, and redistribute oop.js freely and without limitation.

Developed by [aewing](http://www.github.com/aewing)

## Basic Usage
Defining a new class:
```javascript
$class('Bar').via(function() {
    this.construct = function(a, b) {
        this.a = a;
        this.b = b;    
    };
    this.name = 'Bar';
    this.baz = function() {
        return this.a + this.b;
    }
});
```
Instantiating and using the class:
```
var bar = new Bar(5, 10);
console.log(bar.name, bar.baz());
```
Would output:
```
Bar, 15
```

Extending our defined class:
```javascript
$class('Foo').extends('Bar').via(function() {
    this.name = 'Foo';
    this.construct = function(a, b) {
        this.a = a*2;
        this.b = b*2;
    };
});
var foo = new Foo(5,10);
console.log(foo.name, foo.baz());
```
Would output:
```
Foo, 30
```

### More Information
You can learn more at http://www.oopjs.com/docs

#### Change Log
6/28/2014 - Added proxy to $oop.new so class objects can be constructed normally