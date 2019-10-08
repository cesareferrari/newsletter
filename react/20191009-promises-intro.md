# Some ways to load data from external API in React
## Why we use Promises when we access external data

In modern web applications we often need to grab data from external API servers and display it in our own application.

The problem with external services is that the internet is slow and unreliable, so we need to take into account the fact that some problems may arise that will delay the arrival of the data needed.

We normally write functions that perform operations like connecting to external servers and collecting data. But functions are syncronous and if something we do inside a function takes a lot of time to execute, our application may become unresponsive and provide a bad user experience.

To avoid this problem, in React we use a Javascript feature called Promises when we need to grab data from an external API.

Promises are a way for the browser to defer the execution of something in an asyncronous fashion so that the UI doesn't get locked up.

Before looking at Promises, let's look at some traditional ways to get data into an application. Let's start with regular functions.

How syncronous functions work

This is how regular Javascript functions work:

```
function howdy() {
  return 'hi'
}

let response = howdy();

console.log(response);
```

In this contrived example we define a function called howdy() that returns the string 'hi'. When the function executes, the string is returned immediately and the function terminates.
But what if there was a delay in returning the string 'hi'?

This may happen if we call an external service inside our howdy() function. The external service may be slow and we would have to wait until the function is finished. 
We would not be able to do anything else in our application besides twisting our thumbs.

Using callbacks

A way to solve this problem is by using a callback function.

In the code below we define howdy() to take a callback.

howdy() calls the callback and exits immediately so it won't lock up the interface and will let us continue with our general tasks. In the meantime, the callback does it slow work.

When the callback is done it will return the result at its leasure and we can inject the result into the user interface.

```
function howdy(callback) {
  callback('hi');
}

let cb = greetResponse => console.log(greetResponse);

howdy(cb);
```

This approach works but it may become messy if we have a long series of nested callbacks waiting for each other.
It just becomes too complicated to keep track, hard to read and prone to bugs.

Promises solve many of the problems callbacks have.

We will look at how promises work in the next article.

In summary:

When we access external data from an API server there may be delays because of
latency

Since Javascript functions are synchronous, waiting for an external server to
respond may lock up our interface

One common solution to this problem is to defer the potentially slow operation
to a callback that can return its response later

Callbacks can become unwieldy if they need to be nested.

The preferred solution in React is to use Promises

---

I write daily about web development. If you like this article, feel free to share it with your friends and colleagues. 

You can receive articles like this in your inbox by subscribing to this newsletter. Just click the button below to sign up for a free subscription.


