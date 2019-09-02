# Javascript functions

Javascript provides a few ways to define functions.
The way a function is defined influences when the fuction is available to be
invoked and how it behaves as well as on which objects the function can be
invoked.

## Function declarations 

Function declarations must be placed on their own as a separate statement.

It start with the `function` keyword, followed by the function name and a list
of optional arguments, eclosed in parenthesis.
Following the argument list, are brackets that enclose the function body.

```
function myFunction(a, b) {
  return a + b;
}
```

Function declarations can be nested inside another function, like this example:

```
function enclosingFunction() {   
                                 
  function inside() {            
    return "Hello world";        
  }                              
                                 
  return inside();               
                                 
}                                
                                 
console.log(enclosingFunction()); // Hello world
```

## Function expressions

Function expressions are always part of other statements. For example, they can
be on the right side of a variable assignment:

```
const hello = function() { return "Hello" };

console.log(hello);   // [Function: hello]
console.log(hello()); // Hello
```

Function expressions can also be passed as arguments to other functions:

```
myFunction( function() {} );
```

The main difference between function declarations and function expressions is
that in function declarations the function name is mandatory, while in function
expressions it's optional.

Function declarations have a name because they have to be invoked and the way to
invoke them is through their name.
Function expressions have other ways to be invoked. 

For example when we assign a function expression to a variable, we call the
variable name followed by parenthesis to invoke the function.

If it's an argument to another function, we invoke it when we call the parameter
name inside the calling function.

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

Function expressions can be called immediately, with a construct that is called
an immediately invoked function expression.

The way we do it is to write a function expression, and then append parenthesis
at the end. We also need to enclose the function expression in parenthesis or
the Javascript interpreter will have trouble with the syntax.

Here's an example of an immediately invoked function expression:

```
(function() {
  console.log('Hello from a function expression');
})();
```

Another way to immediately invoke function expressions is to use a unary
operator, like + - ! ~

By prefixing the function expression with the unary operator, we signal the
Javascript engine that this is an expression, and not a statement, so the engine
doesn't think that this is a function declaration.

Using this method, we can omit parenthesis around the function expression and
still get the result of invoking the function expression correctly.

```
+function() {
  console.log('IIFE with a unary operator');
}();
```





## Arrow functions (also called lambda functions).

Arrow functions are an ES6 addition to the Javascript standard.

Arrow functions have a shorter, more compact syntax than regular functions.

```
(argument) => { return argument; }
```

Here's an example of an arrow function passed to the sort() method of an array to
determine the sort order.
The syntax is more succinct than if we wrote a function expression.

```
var values = [0, 3, 2, 5, 7, 4, 8, 1];

values.sort((value1, value2) => value1 - value2);
```


## Function constructors

Enables us to dynamically construct a new function from a string that can also
be dynamically generated.

```
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(10, 45));
```

## Generator Functions

We can create functions that can be exited and re-entered later in the
application execution while keeping the value of their variables across these
re-entrances.

We can define generator versions of function declarations, function expressions
and function constructors.

```
function* myGen() { yield 1; }
```
