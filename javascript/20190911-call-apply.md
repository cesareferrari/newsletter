# Function invocation with the apply() and call() methods
## The "this" parameter in the context of Javascript functions

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/function-invocation.jpeg

We have seen in previous articles how the `this` parameter is set differently depending on how the function is invoked.

`this` can be set to the `global` or `window` object if the function is invoked as a regular function, it's set to the object that calls the function when the function is invoked as a method, and it's set to the instance of the object created when the function is invoked as a constructor function.
What if we want to set `this` to an arbitrary object?

We can do that by using the `call()` and `apply()` methods of the function.
Since functions are first class objects in Javascript, they also have properties and methods that we can use.
The `call()` and `apply()` methods are two related built in methods that each function object has that we can use to set this.

The `call()` and `apply()` methods take two parameters.
The first parameter is the object that we want to set as `this`.
The second parameter refers to arguments passed to the function on invocation.
The difference between the `call()` and the `apply()` method is in the way they accept the second parameter.

`call()` will take in a list of arguments, while `apply()` will take in an array of arguments.
Below is an example of using `call()` and `apply()`.
We define two different objects, `pugliese` and `focaccia`, and a `bake()` function.
The `bake()` function prints out a list of the arguments passed to it when it's invoked and also prints out `this`.

```
const pugliese = {
  name: 'Pane pugliese',
  description: 'Round and crunchy'
}

const focaccia = {
  name: 'Focaccia',
  description: 'Soft and flat'
}

function bake() {
  console.log(arguments);
  console.log("'this' is:", this);
}

bake.call(pugliese, 'water', 'flour', 'salt');

// prints out:
// [Arguments] { '0': 'water', '1': 'flour', '2': 'salt' }
// 'this' is: { name: 'Pane pugliese', description: 'Round and crunchy' }


bake.apply(focaccia, ['oil', 'water', 'flour', 'salt']);

// prints out:
// [Arguments] { '0': 'oil', '1': 'water', '2': 'flour', '3': 'salt' }
// 'this' is: { name: 'Focaccia', description: 'Soft and flat' }
```

As you can see, this is set to the object we pass to the function.
The `call()` and `apply()` methods are useful when we want to explicitly set the value of `this` at function invocation.