# Arrow functions, function constructors and generator functions

## A look at different ways to generate functions in Javascript


### Arrow functions (also called lambda functions)
Arrow functions are an ES6 addition to the Javascript standard.

Arrow functions have a shorter, more compact syntax than regular functions.

Here is an example of defining a function with the arrow syntax and assigning it to the justSay identifier.

After defining the function we invoke it with an argument to return.

```
// define the function and assign it to an identifier
const justSay = argument => argument;

// call the function
console.log(justSay("Hello")); // => Hello
```

If there is more than one argument, or there are no arguments, we must surround the argument list with parenthesis.

Also, if there's only one expression in the body of the function, we can omit the return statement.

```
const sayAgain = () => "Hello with no argument";

console.log(sayAgain); // => "Hello with no argument"


const sayOnceMore = (greeting, name) => `${greeting}, ${name}`;

console.log(sayOnceMore("Hi", "Mary")); // => "Hi, Mary"
```

Here's an example of an arrow function passed to the `sort()` method of an array to determine the sort order.

As you can see, the syntax is more succinct than the corresponding function written as a function expression.

```
var values = [0, 3, 2, 5, 7, 4, 8, 1];

values.sort((value1, value2) => value1 - value2);
```

Arrow functions are not just a different way to define functions, they also behave differently from functions defined in other ways.

We will explore those differences in future articles.

### Function constructors

Another way to define functions is through function constructors.

Function constructors are not used often, but they allow us to dynamically construct a new function from a string that can also be dynamically generated.
Here's an example of a function constructor.

```
const sum = new Function('a', 'b', 'return a + b');

console.log(sum(10, 45));  // => 55
```

### Generator functions

We will talk about generator functions more deeply in a following article, but for now let’s just say that by using generator functions we can create functions that can be exited and re-entered later in the application execution while keeping the value of their variables across these re-entrances.

We can define generator versions of function declarations, function expressions and function constructors.
Here's a quick example of a generator function:

```
function* myGen() { yield 1; }
```

Tomorrow we will dive deeper into function parameters and arguments, how to use them, and what the difference between parameter and argument is.

We will also talk about the rest parameter and default parameters.