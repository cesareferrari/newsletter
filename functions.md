# Javascript functions



## Function parameters and arguments

Functions can have parameters, that is, values passed in for the function to
work with. The difference between parameters and arguments is that parameters
are the variables defined in the function declaration statement.
Arguments are actual values passed into the function.

Here's an example of this concept:

```
function greeting(name, age) {  // name and age are function parameters
  return `Hello ${name}, ${age}`;
}

console.log(greeting('Estelle', 13));
```

In this example, the name and age variables on the line where the function is
defined are called parameters.
When we call the function a few lines below, we pass the actual value of those
parameters. These values are called arguments.

So, arguments are values passed to the function at the time of its invocation.

What happens when a list of arguments is passed to a function?

In this case, the arguments are passed to the parameters in the order they are
given. The first argument gets passed to the first parameter. The second
argument gets passed to the second parameter, and so on.

If we have more arguments than available parameters to match them, the excess
arguments are ignored.
But they are not completely discarded, there is still a way to access them.

If there are less arguments than parameters, the parameters that don't match
with an argument are set to undefined.

### The rest parameters

In ES6 we can capture a list of arguments into an array called the rest
parameters. All we have to do is prefix the parameter in the parameter list in
the function definition with the spread operator: ...

```
function multiply(first, ...numbers) {
  console.log(first);
  console.log(numbers);
}

multiply(1, 2, 3, 4, 5); // first: 1, numbers: [ 2, 3, 4, 5 ]
multiply(1, 2, 3, 4, 5, 6, 7); // first: 1, numbers: [ 2, 3, 4, 5, 6, 7 ]
```
Only the last parameter can be a rest parameter, we should put the spread
operator only in the last position.


### Default parameters

To create a default parameter, we assign a value to a parameter in the list when
a function is defined. Here's an example:

```
function greetingTwo(salutation = "Hello", name = "sir") {
  return `${salutation}, ${name}`;
}

console.log(greetingTwo()); // Hello, sir
console.log(greetingTwo(undefined, 'Estelle'));  // Hello, Estelle
```







## this parameter and arguments

When a function is invoked, there are two parameters that are implicitly passed
to the function. By implicitly I mean that you don't specify them in the list of
parameters, but they are still passed to the function automatically and are
accessible from inside the function.

These two parameters are 

- the this parameter
- the arguments parameter

The this parameter represents the object on which our function is invoked, that
is the function context.
The arguments parameter represents all the arguments that are passed into the
function when it's invoked.

The way a function is invoked has repercussions on how the this and the
arguments parameters are set.

Look at this function that prints out the argument it's passed explicitly, but also the
this  and arguments parameter that are passed implicitly:

```
function myHouse(address) {
  console.log("Address:\n", address);
  console.log("this parameter:\n", this);
  console.log("arguments parameter:\n", arguments);
}

myHouse('123 Main st.');
```

The result of the function is:

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

As you can see, the this parameter represents the global object which is the
context in which the function was invoked.
The arguments parameter is an object with keys and values that represent the
explicit arguments that were passed to the function.

Tomorrow we are going to look more deeply at the arguments parameter.








## The arguments parameter

The arguments parameter is a collection of all the arguments passed to a
function when it's invoked. 
It allows us to access all the arguments passed to a function, even the ones not
listed in the parameter list.

The arguments object has a property named length that returns  the number of
arguments passed to the function.

We can access these parameters with an array-like notation.
For example, arguments[0] will return the first argument, arguments[1] will
return the second argument, and so on.

See an example below:

```
function myAddress(number, street, city) {
  console.log("arguments parameter length:", arguments.length);
  console.log("arguments[0]", arguments[0]);
  console.log("arguments[1]", arguments[1]);
  console.log("arguments[2]", arguments[2]);
  console.log("arguments[2]", arguments[3]);  // we hava access to the 4th
                                              // parameter even though it's not
                                              //in the parameter list
}

myAddress(123, 'Main St.', 'Anytown', 'second floor');

// This is what's printed out in the console:

// arguments parameter length: 4
// arguments[0] 123
// arguments[1] Main St.
// arguments[2] Anytown
// arguments[2] second floor
```

Note that even though we specified 3 parameters in the parameter list, we passed
4 arguments when we invoked the function and the fourth argument is available in
the arguments parameter list.

Even though the arguments parameter looks like an array, it's not really a
Javascript array, so we can't use array methods on it.

I mentioned earlied that in ES6 we have a rest parameter, that is used for the
same purposes as the arguments parameter was used in previous versions of
Javascript. The rest parameter is actually an array, so we can use array methods
on it. This makes it preferable to the arguments parameter in many cases.


