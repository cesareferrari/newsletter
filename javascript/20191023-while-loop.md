# Calculate the number of digits with a while loop in Javascript
## How a while loop works

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191023-while-loop.jpeg



So far we have seen how for loops work in Javascript, but the language also has other ways to perform iterations. One way is by using a `while` loop.

`while` loops are useful when we don't know in advance how many times a statement should be executed but we know that it must be executed every time a condition is true.
The `while` loop in Javascript, like in many other languages, has this structure:

```
while (condition) {
  statement
}
```

The loop keeps iterating *while* a condition is `true` and the statement inside the loop is executed every time the loop runs. When the condition becomes `false`, the loop stops iterating and control is passed to the statement after the loop.

Here's an example of a while loop.

```js
let n = 0;

while (n <= 3) {
  console.log(n);
  n++;
}

console.log('End loop')
```

We initialize a number to 0 and inside the loop we print out the number and add 1 to it. The next time the loop executes, `n` will be equal to 2 and so on.

The condition specifies that the loop keeps iterating while `n` is less or equal to 3. When this condition is met, the loop stops, the code prints out 'End loop' and our program exits.

### A real program

Let's put the `while` loop to good use. We know that the number 234 has 3 digits and the number 2 has 1 digit.
What about the number 1000343490884773 ? How many digits are there?

Yes, we could count them one by one but that takes time and we may lose track of the count. It would be much easier to have the computer count them for us.
Can we build a function that quickly calculates how many digits a given number has? Of course we can. We just use our trusty, old `while` loop.

One way to count how many digits a number has is to convert the number to a string and then count the characters.
Here's an example:

```js
[1000343490884773].toString().split('').length     // -> 16

// Hey, it's 16 digits!
```

This will return the correct length, but it feels a little bit like cheating. What if we *don't* want to convert the number to a string?

Another approach is to keep dividing the given number by 10 and count how many times we do this operation.

Every time we divide by 10, we effectively remove a digit from the end of the number.
When there are no digits left, we know how many digits the number has.
Here's a function that does just that:

```js
const numberOfDigits = (n) => {
  let result = 0;

  while (n > 0) {
    n = Math.floor(n / 10);
    result++;
  }

  return result;
}
```

We initialize a `result` variable to 0. This variable keeps track of how many
digits the given number has.

We then set up a `while` loop that runs while the given number is more than 0.
Remember, the number is getting smaller and smaller every time we divide it and it will reach 0 at some point.
Inside the loop we divide the number by 10. Note that we use the `Math.floor()` method because we want to discard the last decimal number:

```js
4773 / 10               // equals 477.3
Math.floor(4773 / 10)   // equals 477
```

Since we removed a digit, we add 1 to the `result` variable.
We keep going until we don't have any more digits to remove. At that point, `n` will be `zero`, so the `while` loop stops and we return `result`, which is the number of digits in the given number.

Let's test it out:

```js
console.log(numberOfDigits(234));                //  3
console.log(numberOfDigits(2));                  //  1
console.log(numberOfDigits(1000343490884773));   // 16
```

And there we have it: we have seen how a `while` loop can help us count the digits in a large number.