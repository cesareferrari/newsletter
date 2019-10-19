# Functions invoked as a constructor
## The value of "this" in a Javascript constructor function

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/constructor.jpeg

Constructor functions are used to create objects. The way we invoke constructor functions is by preceding their invocation with the keyword `new`.
As a convention, we also *capitalize* their name.

Here's an example of a constructor function. We define a function called `Person` that takes two arguments: `name` and `age`.
Inside the function, these two arguments are assigned to parameters prefixed by the `this` parameter.

We then invoke the function with the `new` keyword, and pass a `name` and an `age`. We assign the output of this invocation to a variable named `bill`.
When we print out the result we see that what is returned is an object with two properties, `name` and `age`, that correspond to the arguments we passed in at the moment of the invocation.

```
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const bill = new Person('William', 59);

console.log(bill); // => Person { name: 'William', age: 59 }
```

When we invoke the function with the `new` keyword, a new empty object is created and passed to the function as the `this` parameter. This is the function context.

Then, inside the function we create properties on the `this` parameter of `name` and `age`.
This is like creating properties on an object, we assign values to properties of the `this` object which is the object that was created when we invoked the `Person` function with the `new` keyword. Finally, the function returns this newly created object and passes it to the variable `bill`.

When we invoke the `Person` function again with different parameters, we go through the same steps of:

- creating an empty object
- creating name and age properties on this object
- assigning the value of the arguments passed into the function to the object properties
- returning the object that was created

Here's an example where we call the `Person` function with different arguments. It returns a different object that has the same properties but different values.

```
const mary = new Person('Mary', 49);
console.log(mary); // => Person { name: 'Mary', age: 49 }
```

We have seen that the `this` parameter takes on different values depending on how the function is invoked.

If the function is invoked as a *regular function*, the `this` parameter has the value of the `global` object or the `window` object.

If the function is invoked as a *method*, the `this` parameter is set to the object that invokes the method.

If the function is invoked as a *constructor*, the `this` parameter is set to the instance of the object being created.

There is another way to invoke functions, with the `apply()` and `call()` methods that also has repercussions on the `this` parameter.

We will explore this way tomorrow