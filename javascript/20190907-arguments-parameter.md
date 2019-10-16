## The arguments parameter in Javascript
### All the arguments passed to a function are accessible with the arguments parameter

The arguments parameter is a collection of all the arguments passed to a function when it's invoked. It allows us to access all the arguments passed to a function, even the ones not listed in the parameter list.

The `arguments` object has a property named length that returns the number of arguments passed to the function.
We can access these parameters with an array-like notation.
For example, `arguments[0]` will return the first argument, `arguments[1]` will return the second argument, and so on.

As an example, let's define a function that takes three arguments: *number*, *street*, and *city*. The function prints out its arguments.

```
function myAddress(number, street, city) {
  console.log("arguments parameter length:", arguments.length);
  console.log("arguments[0]", arguments[0]);
  console.log("arguments[1]", arguments[1]);
  console.log("arguments[2]", arguments[2]);


  // we hava access to the 4th parameter even though it's not
  // in the parameter list

  console.log("arguments[2]", arguments[3]);  
}
```

When we call the function with four parameters instead of the three we specified when we defined the function, we don't get any error. The extra argument will be taken in by the function and placed in the arguments parameter where it will still be accessible.

```
myAddress(123, 'Main St.', 'Anytown', 'second floor');

// This is what's printed out in the console:

// arguments parameter length: 4
// arguments[0] 123
// arguments[1] Main St.
// arguments[2] Anytown
// arguments[2] second floor
```

Even though the `arguments` parameter looks like an array, it's not really a Javascript array, so we can't use array methods on it.

I mentioned earlier that in ES6 we have a *rest* parameter, that is used for the same purposes as the arguments parameter was used in previous versions of Javascript. 
The rest parameter is actually an array, so we can use array methods on it. 
This makes it preferable to the arguments parameter in many cases.

Tomorrow we well study the other implicit parameter passed to a function, the `this` parameter.