const sum = new Function('a', 'b', 'return a + b');
console.log(sum(10, 45));


function enclosingFunction() {

  function inside() {
    return "Hello world";
  }

  return inside();

}

console.log(enclosingFunction());


const hello = function() { return "Hello" };

console.log(hello);   // [Function: hello]
console.log(hello()); // Hello


function myOutsideFunction(inside) {
  return inside();
}

myOutsideFunction(function() {
  console.log("Hello world again");
});


(function() {
  console.log('Hello from a function expression');
})();


+function() {
  console.log('IIFE with a unary operator');
}();



// arrow functions

var values = [0, 3, 2, 5, 7, 4, 8, 1];
console.log(values);

values.sort((value1, value2) => value1 - value2);
console.log(values);




// parameters and arguments

function greeting(name, age) {  // name and age are function parameters
  return `Hello ${name}, ${age}`;
}

console.log(greeting('Estelle', 13));


// rest parameters

function multiply(first, ...numbers) {
  console.log(first);
  console.log(numbers);
}

multiply(1, 2, 3, 4, 5); // first: 1, numbers: [ 2, 3, 4, 5 ]
multiply(1, 2, 3, 4, 5, 6, 7); // first: 1, numbers: [ 2, 3, 4, 5, 6, 7 ]



function greetingTwo(salutation = "Hello", name = "sir") {
  return `${salutation}, ${name}`;
}

console.log(greetingTwo()); // Hello, sir
console.log(greetingTwo(undefined, 'Estelle'));  // Hi, Estelle
console.log(greetingTwo(null, 'Estelle'));  // Hi, Estelle



var samurai = (() => "Tomoe")();
var ninja = (() => {return "Yoshi"})();

console.log(samurai);
console.log(ninja);



// this and arguments

function myHouse(address) {
  console.log("Address:\n", address);
  console.log("this parameter:\n", this);
  console.log("arguments parameter:\n", arguments);
}

myHouse('123 Main st.');



function myAddress(number, street, city) {
  console.log("arguments parameter length:", arguments.length);
  console.log("arguments[0]", arguments[0]);
  console.log("arguments[1]", arguments[1]);
  console.log("arguments[2]", arguments[2]);
  console.log("arguments[2]", arguments[3]);
}

myAddress(123, 'Main St.', 'Anytown', 'second floor');



const justSay = argument => argument;
console.log(justSay("hello"));


const sayAgain = () => "Hello with no argument";
console.log(sayAgain());


const sayOnceMore = (greeting, name) => `${greeting}, ${name}`;
console.log(sayOnceMore("Hi", "Mary"));



function animalSound() {
  return "Bark";
}

console.log(animalSound());

const sound = function() { return "Moo" };
console.log(sound());   // => "Moo"


(function() { 
  console.log(this);
  return "Meow"
})();





// Functions as methods

const person = {
  name: 'John',
  age: 50
}

person.ability = function () {
  console.log(this);  // => { name: 'John', age: 50, ability: [Function] }

  return 'I can play the piano';
}

console.log(person.ability()); // => I can play the piano



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
pedro.ability('eat hot dogs');




function Person(name, age) {
  this.name = name;
  this.age = age;
}

const bill = new Person('William', 59);
console.log(bill);

const maryann = new Person('Mary Ann', 49);
console.log(maryann);
