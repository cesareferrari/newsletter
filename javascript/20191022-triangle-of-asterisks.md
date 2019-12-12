# Triangle of asterisks
## Using a loop to print to the console in Javascript

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191022-triangle-of-asterisks.jpeg



We have seen how to use a Javascript `for` loop to make calculations in how to [calculate a factorial of an integer](https://cesare.substack.com/p/using-for-loop-to-output-a-factorial-4fd).

`for` loops can be used to print out characters to the console, as well.
Here I am describing a common problem of printing a triangle of asterisks given an input number that specifies the size of the triangle.
For example, if the given number is 4, we should print out a triangle like this:

```
*
**
***
****
```

Four rows and four columns of asterisks.
The size of the triangle is governed by the integer passed in as the argument.

We start by writing down our requirements:

- We have an unknown integer as an input.
- The integer is greater than zero.
- The output should be asterisks printed out to the console.
- We should print out a number of rows that's equal to the argument.
- The fist row will have 1 asterisk.
- For each subsequent row we have 1 asterisk more than the row that came before it.
- The last row has the same number of asterisks as the argument.

We know that if we want to handle a series of things recursively we can use a `for` loop.
To get our feet wet, let's start by defining a function that prints out as many asterisks as the input number:

```js
const triangle = n => {
  for (let i = 1; i <= n; i++) {
    process.stdout.write('*');
  }
  process.stdout.write('\n');
}
```

We could print out stuff using `console.log` but `console.log` adds a return character at the end of its output, which may mess things up for us in this case, so I am using `process.stdout.write`, which writes to standard out but doesn't add any extra characters.

As you can see, we are just iterating from 1 to `n` (`n` being the argument passed to our function) and for each iteration we print out `*`.
At the end of the loop, we print out a return character to separate the console prompt from our printout.
If we call our function like this:

```js
triangle(5);
```

we get this result:

```
*****
```

It's a start. Now, how do we print the columns?

### Printing the columns

It looks like a second loop, nested inside the first loop, would help.
This would be our structure in pseudocode:

```js
for ( 1 to n ) {   // outer iteration

  for ( 1 to n ) {  // inner iteration
    // print `*` 
  }

  // print new line

}
```

This code says:

- Start outer iteration, counter is 1
- Start inner iteration, counter is 1
- Print `*`
- Print new line
- Go back to outer iteration, now the counter is 2
- Run the inner iteration 2 times
- Inner iteration prints out `*` 2 times, for a total of `**`
- Print new line
- Go back to outer iteration, now the counter is 3
- Inner iteration prints out `*` 3 times, for a total of `***`
- ... and so on until we reach n
- Then stop and exit the function.

Now, let's replace our pseudo code with real code, setting up the variables for the `for` loop.
The inner loop uses its own set of variables, as you can see:

```js
const triangle = n => {

  for (let i = 1; i <= n; i++) {

    for (let j = 1; j <= i; j++) {
      process.stdout.write('*');
    }
    process.stdout.write("\n");
  }

}
```

Now, if we call this code with:

```js
triangle(10);
```

we get the result we want:

```
*
**
***
****
*****
******
*******
********
*********
********** 
```

In this article we have seen how to use a nested loop to print out random characters to the console.
We'll talk more about Javascript iterations in future articles.