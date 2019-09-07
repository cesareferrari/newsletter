# Javascript functions


## The this parameter

When a function is invoked, an implicit parameter called this is automatically passed to it.
The this parameter is very important in Javascript and refers to an object
associated with the function invocation, also called the function context.

What the this paramter points to is influenced by where the function is defined
and by how the function is invoked.

As we have seen, there are different ways of invoking functions and each way
sets this to a different context.

### Invoking functions

Functions can be invoked in five ways:

as a regular function:

hello();

as a method, which ties the function to an object:

person.hello();

as a constructor, which creates an instance of an object:

new Person();

with the apply() method of the function:

person.apply(hello)


with the call() method of the function:

person.call(hello)
 

Note that the function is invoked by adding a set of parenthesis right after an
expression that evaluates to a function.

### Function invoked as a function

We invoke, or call, a function as a function when we add a set of parenthesis after a
standalone function identifier.

Here's an example of how to invoke a function definition:

```
function animalSound() { return "Bark"; }
animalSound();  // => "Bark"
```


Here's an example of how to invoke a function expression:

```
const sound = function() { return "Moo" };
sound();   // => "Moo"
```


And finally an example of using an immediately invoked function expression:

```
(function() { return "Meow" })();  // => "Meow"
```

Note that we enclosed the function expression in parenthesis so the Javascript
interpreter didn't get confused by the syntax. We then added a set of parenthesis at the
end, to invoke the function.

When invoked in this way, and the code is in non-strict mode, the this parameter is set to the global context, which is the window object.
When the code is in strict mode, the this parameter is set to undefined.

Here's an example of what the this parameter is set to as the global object when we print it out from inside the function:

```
(function() { 
  console.log(this);
  return "Meow"
})();

// prints out:

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
```

Tomorrow we are going to look at what happens when a function is invoked as a
method.

---



## Functions invoked as methods

Functions are called methods when they are assigned to an object property.

In the following code, we create a person object and assign a couple of
properties: name and age.

Later, we assign a new property, called ability.
This property is set to a function that returns a string.

We can call this person.property and this call is said to be a method call of
that object.

```
const person = {
  name: 'John',
  age: 50
}

person.ability = function () {
  return 'I can play the piano'
}

console.log(person.ability()); // => I can play the piano
```

When we call a function as a method, the related object on which the function is
defined becomes the context of the function and within the function, the this
parameter is set to this object.

We can verify this by printing out the value of this from within the ability
function. From within the function, this returns the object that invoked the
function, which is the person object. 

```
person.ability = function () {
  console.log(this);  
  return 'I can play the piano';
}

// Prints out the value of this, that is the object that called the function
// => { name: 'John', age: 50, ability: [Function] }
```

It's important to note that the same function can have different contexts
depending on how it's invoked.

As an example, in the following code, we define a myAbility function and then
assign this same function to two different objects.
When we print out the value of this  from inside the function, we see that this
refers to two different things, depending from where the function is invoked.

When we call myAbility on the object mary, the value of this is

{ name: 'Mary', ability: [Function: myAbility] }


When we call myAbility on the object pedro, on the other hand, the value of this is

{ name: 'Pedro', ability: [Function: myAbility] }



```
const myAbility = function (ability) {
  console.log(this);
  return `I can ${ability}`;
}

const mary = {
  name: 'Mary',
  ability: myAbility
}

const pedro = {
  name: 'Pedro',
  ability: myAbility
}


mary.ability('play the piano');
// Value of this: { name: 'Mary', ability: [Function: myAbility] }

pedro.ability('eat hot dogs');
// Value of this: { name: 'Pedro', ability: [Function: myAbility] }

```


---



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


