QUnit.test("OOP core functioning", function( assert ) {
    assert.ok( typeof(OOP) !== "undefined", "Confirmed" );
    var original = { value: 'foo' }; var clone = $oop.clone(original);
    assert.ok(original.value === clone.value, 'OOP clone() function creates a copy');
    clone.value = 'bar';
    assert.ok(original.value !== clone.value, 'OOP clone() function creates a unique copy');
});

QUnit.test("Classes functioning", function ( assert ) {
    var foo = $new('Foo')(1, 1);
    var bar = $new('Bar')(2, 2);
    assert.ok((foo.a === 1 && foo.b === 1), 'Base class instantiation confirmed');
    assert.ok((bar.a === 2 && bar.b === 2 && bar.type === 'bar' && bar.ancestor === 'fu'), 'Extended class constructor confirmed');
    assert.ok((bar.instanceOf('Foo')), 'Classes store parent reference');
})