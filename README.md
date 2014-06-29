# oop.js
[oop.js](http://www.oopjs.com) is a lightweight pseudo-object-oriented library for 
extensible and reusable objects in JavaScript. oop.js works in the browser and in Node.JS projects.

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
Output:
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
Output:
```
Foo, 30
```

### More Information
To learn more, check out the [documentation](http://www.oopjs.com/docs) or [try oop.js now](http://www.oopjs.com/).

#### Change Log
+ 6/28/2014 - Added proxy to $oop.new so class objects can be constructed normally
+ 6/29/2014 - Added support for Node.JS