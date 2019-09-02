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



