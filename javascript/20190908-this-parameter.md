# The this parameter in Javascript
## The this parameter is automatically passed on function invocation.

When a function is invoked, an implicit parameter called `this` is automatically passed to it.

The `this` parameter is very important in Javascript and refers to an object associated with the function invocation, also called the *function context*.

What the `this` parameter points to is influenced by where the function is defined and by how the function is invoked.

As we have seen, there are different ways of invoking functions and each way sets this to a different context.

### Invoking functions

Functions can be invoked in four ways:

As a regular function:

```
hello()
```

As a method, which ties the function to an object:

```
person.hello()
```
As a constructor, which creates an instance of an object:

```
new Person()
```

With the `call()` and `apply()` methods:

```
person.apply(object, array)
person.call(object, argument1, argument2)
```

Note that in each case the function is invoked by adding a set of parenthesis right after an expression that evaluates to a function.

### Function invoked as a function

We invoke, or call, a function as a function when we add a set of parenthesis after a standalone function identifier.
Here's an example of how to invoke a function definition:

```
function animalSound() { return "Bark"; }
animalSound();  // => "Bark"
```
Here's an example of how to invoke a function expression:

```
const sound = function() { return "Moo" };
sound();   // => "Moo"
```

And finally, an example of using an immediately invoked function expression:

```
(function() { return "Meow" })();  // => "Meow"
```

Note that we enclosed the function expression in parenthesis so the Javascript interpreter didn't get confused by the syntax. We then added a set of parenthesis at the end, to invoke the function.
When invoked in this way, and the code is in non-strict mode, the this parameter is set to the global context, which is the window object.
When the code is in strict mode, the `this` parameter is set to undefined.

Here's an example of what the `this` parameter is set to as the global object when we print it out from inside the function:

```
(function() { 
  console.log(this);
  return "Meow"
})();
```

prints out:

```
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(util.promisify.custom)]: [Function]
  }
}
```

Tomorrow we are going to look at what happens when a function is invoked as a method.