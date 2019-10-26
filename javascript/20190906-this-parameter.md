# The "this" and "arguments" parameters in Javascript
## A look at two parameters implicitly passed on function invocation

When a function is invoked, there are two parameters that are implicitly passed to the function. By implicitly I mean that you don't specify them in the list of parameters, but they are still passed to the function automatically and are accessible from inside the function.

These two parameters are:
- the this parameter
- the arguments parameter

The `this` parameter represents the object on which our function is invoked, also called the *function context*.

The `arguments` parameter represents all the arguments that are passed into the function when it's invoked.

The way a function is invoked has repercussions on how the this and the arguments parameters are set.

Look at this function that prints out the argument it's passed explicitly, but also the this  and arguments parameter that are passed implicitly:

```
function myHouse(address) {
  console.log("Address:\n", address);
  console.log("this parameter:\n", this);
  console.log("arguments parameter:\n", arguments);
}

myHouse('123 Main st.');
```

The result of invoking the function is:

```
Address:
 123 Main st.

this parameter:
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

arguments parameter:
 [Arguments] { '0': '123 Main st.' }

```

As you can see, the `this` parameter represents the global object which is the context in which the function was invoked.

The `arguments` parameter is an object with keys and values that represent the explicit arguments that were passed to the function.

Tomorrow we are going to look more deeply at the arguments parameter.
