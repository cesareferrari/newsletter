# Javascript function expressions

Javascript function expressions are always part of other statements.
For example, they can be on the right side of a variable assignment, like the example below:

```
const hello = function() { return "Hello" };

console.log(hello);   // [Function: hello]
console.log(hello()); // Hello
```

Function expressions can also be passed as arguments to other functions:

```
myFunction( function() {} ); // function expression passed as an argument
```

The main difference between the function declarations we saw yesterday and function expressions is that in function declarations the function name is mandatory, while in function expressions it's optional.

Function declarations have a name because the main purpose of a function is to be invoked  and the way to invoke a function is through itd name.
Function expressions have other ways to be invoked. 

For example when we assign a function expression to a variable, we invoke the function by calling the variable name followed by parenthesis.

If the function expression is an argument to another function, we invoke it when we call the parameter name inside the calling function.

```
function myOutsideFunction(inside) {
  return inside();
}

myOutsideFunction(function() {
  console.log("Hello world again");
})

// prints out:
// "Hello world again"
```

Function expressions can be called immediately, with a construct that is called "immediately invoked function expression".

The way we do it is to write a function expression, and then append parenthesis at the end. We also need to enclose the actual function expression in parenthesis or the Javascript interpreter will have trouble with the syntax.

Here's an example of an immediately invoked function expression:

```
(function() {
  console.log('Hello from a function expression');
})();
```

Another way to immediately invoke function expressions is to use a unary operator, like + - ! ~

By prefixing the function expression with the unary operator, we signal to the Javascript engine that this is an expression, and not a statement, so the engine doesn't think that this is a function declaration.

Using this method, we can omit parenthesis around the function expression and still get the result of invoking the function expression correctly.

```
+function() {
  console.log('IIFE with a unary operator');
}();
```

Tomorrow we are going to briefly look at three more ways we can define functions
in Javascript.
