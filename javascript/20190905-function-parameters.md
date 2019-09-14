## Function parameters and arguments
### The difference between parameters and arguments in Javascript

Functions can have parameters, that is, values passed in for the function to work with. 
The difference between parameters and arguments is that parameters are the variables defined in the function declaration statement.
Arguments are the actual values passed into the function.

Here's an example of this concept:

```
function greeting(name, age) {  // name and age are function parameters
  return `Hello ${name}, ${age}`;
}

console.log(greeting('Estelle', 13));
```

In this example, the name and age variables on the line where the function is defined are called parameters.
When we call the function, a few lines below, we pass the actual value of those parameters. These values are called arguments.

So, arguments are values passed to the function at the time of its invocation.

What happens when a list of arguments is passed to a function?

In this case, the arguments are passed to the parameters in the order they are given. The first argument gets passed to the first parameter. The second argument gets passed to the second parameter, and so on.

If we have more arguments than available parameters to match them, the excess arguments are ignored.
But they are not completely discarded, there is still a way to access them.

If there are less arguments than parameters, the parameters that don't match with an argument are set to undefined.

### The rest parameters

In ES6 we can capture a list of arguments into an array called the rest parameters. All we have to do is prefix the parameter in the parameter list in the function definition with the spread operator: ...

```
function multiply(first, ...numbers) {
  console.log(first);
  console.log(numbers);
}

multiply(1, 2, 3, 4, 5); // first: 1, numbers: [ 2, 3, 4, 5 ]
multiply(1, 2, 3, 4, 5, 6, 7); // first: 1, numbers: [ 2, 3, 4, 5, 6, 7 ]
```
Only the last parameter can be a rest parameter, we should put the spread operator only in the last position.


### Default parameters

To create a default parameter, we assign a value to a parameter in the list when a function is defined. Here's an example:

```
function greetingTwo(salutation = "Hello", name = "sir") {
  return `${salutation}, ${name}`;
}

console.log(greetingTwo()); // Hello, sir
console.log(greetingTwo(undefined, 'Estelle'));  // Hello, Estelle
```

Tomorrow we will take a look at parameters that are implicitly passed to functions when they are invoked.