# Javascript functions



## Functions invoked as a constructor


Constructor functions are used to create objects. The way we invoke constructor
functions is by preceding their invocation with the keword new.
As a convention, we also capitalize their name.

Here's an example of a constructor function. We define a function called Person
that takes two arguments: name and age.
Inside the function, these two arguments are assigned to parameters prefixed by
the this parameter.

We then invoke the function with the new keyword, and pass a name and an age. We
assign the output of this invocation to a variable named bill.

When we print out the result we see that what is returned is an object with two
property, name and age, that correspond to the arguments we passed in at the
moment of the invocation.

```
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const bill = new Person('William', 59);

console.log(bill); // => Person { name: 'William', age: 59 }
```

When we invoke the function with the new keyword, a new empty object is created
and passed to the function as the this parameter. This is the function context.
Then, iside the function we create properties on the this parameter of name and
age.
This is like creating properties on an object, we assign values to properties of
the this object which is the object that was created when we invoked the Person
function with the new keyword.

Finally, the function returns this newly created object and passes it to the
variable bill.

When we invoke the Person function again with different parameters, we go
through the same steps of:

- creating an empty object 
- creating name and age properties on this object
- assigning the value of the arguments passed into the function to the object properties
- returning the object that was created

Here's an example where we call the Person function with different arguments.
It returns a different object that has the same properties but different values.

```
const mary = new Person('Mary', 49);
console.log(mary); // => Person { name: 'Mary Ann', age: 49 }
```

We have seen that the this parameter takes on different values depending on how
the function is invoked.

If the function is invoked as a regular function, the this parameter has the
value of the global object or the window object.

If the function is invoked as a method, the this parameter is set to the object
that invokes the method.

If the function is invoked as a constructor, the this parameter is set to the
instance of the object being created.

There is another way to invoke functions, with the apply() and call() methods
that also has repercussions on the this parameter.

We will explore this way tomorrow.






---


## Function invocation with the apply() and call() methods
### The "this" parameter in the context of Javascript function invocation

We have seen in previous articles how the this parameter is set differently
depending on how the function is invoked.

this can be set to the global or window object if the function is invoked as a
regular function, it's set to the object that calls the function when the
function is invoked as a method, and it's set to the instance of the object
created when the function is invoked as a constructor function.

What if we want to set this to an arbitrary object?

We can do that by using the call() and apply() methods of the function.

Since functions are first class objects in Javascript, they also have properties
and methods that we can use.

The call() and apply() methods are two related built in methods that each
function object has that we can use to set this.

The call() and apply() methods take two parameters.
The first parameter is the object that we want to set as this.
The second parameter refers to arguments passed to the function on invocation.

The difference between the call() and the apply() method is in the way they
accept the second parameter. 
call() will take in a list of arguments, while apply() will take in an array of
arguments.

Below is an example of using call() and apply(). 
We define two different objects, pugliese and focaccia, and a bake() function.
The bake() function prints out a list of the arguments passed to it when it's
invoked and also prints out this.

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


The call() and apply() methods are useful when we want to explicitly set the
value of this at function invocation.

