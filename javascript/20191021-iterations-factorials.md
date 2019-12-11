# Using a for loop to output a factorial
## How to iterate in Javascript

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191021-iterations-factorials.jpeg



One way to use a `for` loop in Javascript is to calculate a factorial of an integer.

A factorial is the product of an integer and all the integers below it. So, if we have the integer 5, the factorial will be the product of 1, 2, 3, 4, and 5:

```
1 * 2 * 3 * 4 * 5 = 120
```

This calculation seems a very good candidate for a loop. We take each number in turn and multiply it by the product of the previous numbers.
Let's start by creating a function skeleton that we can call later with the input integer:

```js
const factorialOf = integer => {
  // calculation goes here
}
```

This is an arrow function called `factorialOf` and takes an integer as its sole argument.
Since we start calculating from 1, it makes sense to initialize a variable that holds the factorial to 1 inside our function:

```js
let factorial = 1;
```

We use let in this case because this variable will be reassigned every time we go through the loop. If we used const to declare the variable we would get an error because `const` cannot be reassigned after it's created.

Our function needs to return something. Since we calculate a factorial and we put the result into the factorial variable, we might as well return it at the end of `factorialOf`:

```js
return factorial;
```

Now we need to do the hard work of actually calculating the factorial using a for loop.

### The `for` loop

Let's think for a moment how we are going to do this. Let's write down the requirements for this function.

- We need to start with the number 1, so the initial counter can be set to 1.
- We need to keep looping until our counter is less or equal to the input integer.
- We need to take the initial factorial result and multiply it by the counter every time inside the loop.
- After each step through the loop, we need do increase our counter by 1.

With all this in mind, let's write a loop that fulfills all these requirements:

```js
for(let i = 1; i <= integer; i++) {
  factorial *= i;
}
```

Well, our code is pretty short but as you can see it fulfills all our requirements.
We initialize `i` to 1, we run the loop while `i <=` integer and we increment `i` by 1 at each turn.
Inside the loop, we take factorial and multiply it by the value of `i`.
Below is the full function code:

```js
const factorialOf = integer => {
  let factorial = 1;

  for(let i = 1; i <= integer; i++) {
    factorial *= i;
  }

  return factorial;
}
```

If we test it out now, we get the correct results:

```js
console.log(factorialOf(2));  // 2
console.log(factorialOf(5));  // 120
console.log(factorialOf(4));  // 24
```

### Summary

We performed a slightly complex operation of creating a function that calculates a factorial given an integer by using a for loop.
We iterated on all numbers between 1 and the given integer and multiplied each one by the previous numbers inside the loop.
We finally returned the result of the operation.

We'll see another example of looping tomorrow: we will print out characters to the console by using a double loop.