# Javascript functions

## Function declarations  

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

