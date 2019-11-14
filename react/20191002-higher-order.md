# Higher order components and currying in React
## Add extra functionalities to React components

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191002-higher-order.jpeg



Imagine you have a box. You put a white ball in the box. Close the box. Count to three. Then open the box and, lo and behold, the ball, by magic, has turned red.

This is what happens with higher order components in React.
A higher order component is like a magic box that wraps a regular component and gives it some extra capabilities.

Of course, there is no magic involved, we just add extra capabilities with Javascript.
Higher order components, or HOC, are simply functions that take a component as an argument. Here's an example of a higher order component:

```
const EnhancedComponent = higherOrderComponent(OriginalComponent);
```

The `higherOrderComponent` function takes `OriginalComponent` in as an argument, adds some functionality to it, and spits it back as an `EnhancedComponent`.

We will learn more about higher order components in future articles. For now I want to spend a few words on the idea of *currying*.

### Currying

The concept of higher order component is based on the concept of currying or *partially applied functions*.

Here's an example of currying.
We define a function called multiply that takes one argument: `x`.
This function returns another anonymous function that also takes one argument: `y`.
In turn, the anonymous function returns the product of `x` and `y`.

```
function multiply(x) {
  return function(y) {
    return x * y
  }
}
```

When we call the `multiply` function with the argument of 3, we get back a partially applied function that ultimately returns `3 * y`.
That is, we get back a function that takes *any* argument and multiplies it by 3.

If we assign `multiply(3)` to an identifier called `multiplyByThree`, this will create a `multiplyByThree` function that takes *any* argument and multiplies it by 3.

```
function multiply(x) {
  return function(y) {
    return x * y
  }
}

let multiplyByThree = multiply(3);

console.log(multiplyByThree(6));  // 18
console.log(multiplyByThree(4));  // 12
```

So, `multiplyByThree` is a partially applied function. When we call it and pass in the argument, the function gets fully applied and we get the final output.

`multiplyByThree` is like the magic box, we put a number in it and take out a different number.

We can use arrow function syntax to make function definition shorter, although it may be a little harder to understand.
The code below defines the same `multiply` function as above but using arrow function syntax:

```
let multiply = x => y => x * y;
```

We can also call the `multiply` function directly without creating an intermediate function.
In the code below we invoke `multiply` passing 2 as an argument. This returns a partially applied function. We then invoke the resulting function passing 10 as an argument. The final result is `2 * 10 = 20`

```
multiply(2)(10)  // 20
```

Currying is a somewhat advanced topic of functional programming, but understanding it is helpful in understanding higher order components in React.

If you like this article and want to receive more in your inbox, just click the button below to sign up for a free subscription.
