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

