# Functions invoked as methods
## The value of "this" when a Javascript function is invoked as a method of an object.



https://unsplash.com/photos/jnZ5fTnn0i8/download?force=true

Photo by Alex Makarov on Unsplash




Functions are called methods when they are assigned to an object property.

In the following code, we create a person object and assign a couple of properties: name and age.
Later, we assign a new property, called ability.  This property is set to a function that returns a string.
We can call this person.property and this call is said to be a method call of that object.

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

When we call a function as a method, the related object on which the function is defined becomes the context of the function and within the function, the this parameter is set to this object.

We can verify this by printing out the value of this from within the ability function. From within the function, this returns the object that invoked the function, which is the person object. 

```
person.ability = function () {
  console.log(this);  
  return 'I can play the piano';
}

// Prints out the value of this, that is the object that called the function
// => { name: 'John', age: 50, ability: [Function] }
```

It's important to note that the same function can have different contexts depending on how it's invoked.

As an example, in the following code, we define a myAbility function and then assign this same function to two different objects.
When we print out the value of this  from inside the function, we see that this refers to two different things, depending from where the function is invoked.

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

When we call myAbility on the object mary, the value of this is

{ name: 'Mary', ability: [Function: myAbility] }


When we call myAbility on the object pedro, on the other hand, the value of this is

{ name: 'Pedro', ability: [Function: myAbility] }

In the next article we will explore what happens to the this parameter when we invoke constructor functions.


