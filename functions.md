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





